/* eslint-disable @typescript-eslint/no-shadow */

'use server';

import { Role, Position } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addStudent(student: {
  name: string;
  aboutMe: string;
  education: string;
  email: string;
  skills: string;
  location: string;
  professionalPage: string;
  profileImage: string;
  owner: string;
}) {
  await prisma.student.create({
    data: {
      name: student.name,
      aboutMe: student.aboutMe,
      education: student.education,
      email: student.email,
      skills: student.skills.split(','),
      location: student.location,
      professionalPage: student.professionalPage,
      profileImage: student.profileImage,
      owner: student.owner,
    },
  });
  // After adding, redirect to the list page
  redirect('/student');
}

export async function editStudent(student: {
  id: number;
  name: string;
  aboutMe: string;
  education: string;
  email: string;
  skills: string;
  location: string;
  professionalPage: string;
  profileImage: string;
  owner: string;
}) {
  await prisma.student.update({
    where: { id: student.id },
    data: {
      name: student.name,
      aboutMe: student.aboutMe,
      education: student.education,
      email: student.email,
      skills: student.skills.split(','),
      location: student.location,
      professionalPage: student.professionalPage,
      profileImage: student.profileImage,
      owner: student.owner,
    },
  });
  // After updating, redirect to the list page
  redirect('/student');
}

export async function addCompany(company: {
  name: string;
  overview: string;
  location: string;
  links: string;
  emails: string;
  profileImage: string;
  owner: string;
  positions: {
    title: string;
    description: string;
    skills: string[];
    jobType: string[];
    numberOfHires: number;
    salaryRange: number;
  }[];
}) {
  await prisma.company.create({
    data: {
      name: company.name,
      overview: company.overview,
      location: company.location,
      links: company.links.split(','),
      emails: company.emails.split(','),
      profileImage: company.profileImage,
      owner: company.owner,
      positions: {
        create: company.positions.map((position) => ({
          title: position.title,
          description: position.description,
          skills: position.skills,
          jobType: position.jobType,
          numberOfHires: position.numberOfHires,
          salaryRange: position.salaryRange,
        })),
      },
    },
  });
  redirect('/company');
}

export async function editCompany(company: {
  id: number;
  name: string;
  location: string;
  overview: string;
  links: string;
  profileImage: string;
  emails: string;
  owner: string;
  positions: Position[];
}) {
  const { id, positions, ...companyData } = company;

  // Separate existing positions from new positions
  const existingPositions = positions.filter((position) => position.id);
  const newPositions = positions.filter((position) => !position.id);

  await prisma.company.update({
    where: { id },
    data: {
      ...companyData,
      links: company.links.split(',').map((link) => link.trim()),
      emails: company.emails.split(',').map((email) => email.trim()),
      positions: {
        deleteMany: {
          companyId: id,
          id: {
            notIn: existingPositions.map((position) => position.id),
          },
        },
        upsert: existingPositions.map((position) => ({
          where: { id: position.id },
          update: {
            title: position.title,
            description: position.description,
            skills: position.skills,
            jobType: position.jobType,
            numberOfHires: position.numberOfHires,
            salaryRange: position.salaryRange,
          },
          create: {
            title: position.title,
            description: position.description,
            skills: position.skills,
            jobType: position.jobType,
            numberOfHires: position.numberOfHires,
            salaryRange: position.salaryRange,
          },
        })),
        create: newPositions.map((position) => ({
          title: position.title,
          description: position.description,
          skills: position.skills,
          jobType: position.jobType,
          numberOfHires: position.numberOfHires,
          salaryRange: position.salaryRange,
        })),
      },
      // positions: {
      //   deleteMany: {},
      //   create: company.positions.map((position) => ({
      //     title: position.title,
      //     description: position.description,
      //     skills: position.skills,
      //     jobType: position.jobType,
      //     numberOfHires: position.numberOfHires,
      //     salaryRange: position.salaryRange,
      //   })),
      // },
      // positions: {
      //   create: company.positions.map((position) => ({
      //     title: position.title,
      //     description: position.description,
      //     skills: position.skills,
      //     jobType: position.jobType,
      //     numberOfHires: position.numberOfHires,
      //     salaryRange: position.salaryRange,
      //   })),
      // },
    },
  });

  // After updating, redirect to the list page
  redirect('/company');
  redirect('/company');
}
/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password, role.
 */
export async function createUser(credentials: { email: string; password: string; role: string }) {
  const password = await hash(credentials.password, 10);

  let role: Role = Role.STUDENT;
  if (credentials.role === 'student') {
    role = Role.STUDENT;
  } else if (credentials.role === 'company') {
    role = Role.COMPANY;
  } else if (credentials.role === 'admin') {
    role = Role.ADMIN;
  } else {
    role = Role.USER;
  }

  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
      role,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

/**
 * Counts the number of users in the database
 * @returns The total number of users
 */
export async function getUserCount(): Promise<number> {
  const count = await prisma.user.count();
  return count;
}

/**
 * Counts the number of positions posted by the company or admin
 * @returns the total number of job positions
 */
export async function getJobPostingCount(): Promise<number> {
  const count = await prisma.position.count();
  return count;
}

/**
 * Updates the role of an existing user in the database.
 * @param userId - The unique ID of the user whose role is to be updated.
 * @param newRole - The new role to assign to the user.
 */
export async function editUserRole(userId: number, newRole: string): Promise<void> {
  let role: Role = Role.USER; // Default to USER if the role is not recognized

  if (newRole === 'student') {
    role = Role.STUDENT;
  } else if (newRole === 'company') {
    role = Role.COMPANY;
  } else if (newRole === 'admin') {
    role = Role.ADMIN;
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: role,
      },
    });
    console.log('User role updated successfully');
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
}

/**
 * Deletes a user from the database.
 * @param userId - The unique ID of the user to be deleted.
 */
export async function deleteUser(userId: number): Promise<void> {
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    console.log(`User with ID ${userId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Assuming you have a 'positions' table directly storing job listings
export async function getJobListings() {
  return await prisma.position.findMany({
    include: {
      company: true,
    },
  });
}

export async function deleteJobPosting(jobId: number): Promise<void> {
  try {
    await prisma.position.delete({
      where: { id: jobId },
    });
    console.log(`Job posting with ID ${jobId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting job posting:', error);
    throw error;
  }
}
