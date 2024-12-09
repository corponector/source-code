'use server';

import { Company, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addStudent(student: {
  name: string;
  aboutMe: string;
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

export async function editCompany(company: Company) {
  await prisma.company.update({
    where: { id: company.id },
    data: {
      name: company.name,
      overview: company.overview,
      location: company.location,
      links: company.links,
      emails: company.emails,
      profileImage: company.profileImage,
      owner: company.owner,
    },
  });
  redirect('/company');
}

/*
export async function addPosition(position: {
  title: string;
  description: string;
  skills: string;
  jobType: string[]; // FIXME: Change to JobType[]
  numberOfHires: number;
  salaryRange: string;
}) {
  // let jobType: JobType[] = [];

  await prisma.position.create({
    data: {
      title: position.title,
      description: position.description,
      skills: position.skills.split(','),
      jobType: position.jobType, // FIXME: Change to JobType[]
      numberOfHires: position.numberOfHires,
      salaryRange: position.salaryRange,
    },
  });
  // After adding, redirect to the list page
  redirect('/company');
} */

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
