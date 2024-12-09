import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
    }
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
    // console.log(`  Created user: ${user.email} with role: ${user.role}`);
  });

  config.students.forEach(async (data, index) => {
    console.log('Adding student: ', data);

    await prisma.student.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        aboutMe: data.aboutMe,
        skills: data.skills,
        location: data.location,
        professionalPage: data.professionalPage,
        profileImage: data.profileImage,
        owner: Array.isArray(data.owner) ? data.owner.join(', ') : data.owner,
      },
    });
  });

  config.companies.forEach(async (data, index) => {
    console.log('Adding company: ', data);

    await prisma.company.upsert({
      where: { id: index + 1 },
      update: {},
      create: {
        name: data.name,
        overview: data.overview,
        location: data.location,
        profileImage: data.profileImage,
        positions: {
          create: data.positions.map((position) => ({
            title: position.title,
            description: position.description,
            skills: position.skills,
            jobType: position.jobType,
            numberOfHires: position.numberOfHires,
            salaryRange: position.salaryRange,
          })),
        },
        links: data.links,
        emails: data.emails,
        owner: Array.isArray(data.owner) ? data.owner.join(', ') : data.owner,
      },
    });
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
