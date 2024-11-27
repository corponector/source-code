'use server';

import { Stuff, Condition, Company } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

export async function addStudent(student: {
  name: string;
  skills: string;
  location: string;
  professionalPage: string;
  owner: string;
}) {
  await prisma.student.create({
    data: {
      name: student.name,
      skills: student.skills.split(','),
      location: student.location,
      professionalPage: student.professionalPage,
      owner: student.owner,
    },
  });
  // After adding, redirect to the list page
  redirect('/student');
}

export async function editStudent(student: {
  id: number;
  name: string;
  skills: string;
  location: string;
  professionalPage: string;
  owner: string;
}) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.student.update({
    where: { id: student.id },
    data: {
      name: student.name,
      skills: student.skills.split(','),
      location: student.location,
      professionalPage: student.professionalPage,
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
  owner: string;
}) {
  await prisma.company.create({
    data: {
      name: company.name,
      overview: company.overview,
      location: company.location,
      links: company.links.split(','),
      emails: company.emails.split(','),
      owner: company.owner,
    },
  });
  // After adding, redirect to the list page
  redirect('/company');
}

export async function editCompany(company: Company) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.company.update({
    where: { id: company.id },
    data: {
      name: company.name,
      overview: company.overview,
      location: company.location,
      links: company.links,
      emails: company.emails,
      owner: company.owner,
    },
  });
  // After updating, redirect to the list page
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
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

// Ensure this file exports the searchStuff function

export const searchStuff = async (query: string) => prisma.stuff.findMany({
  where: {
    name: {
      contains: query,
      mode: 'insensitive',
    },
  },
});
