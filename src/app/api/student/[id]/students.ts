import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust the import path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  console.log(`Received request for student ID: ${id}`);

  if (req.method === 'GET') {
    try {
      const student = await prisma.student.findUnique({
        where: { id: parseInt(id as string, 10) },
      });

      if (!student) {
        console.log(`Student with ID ${id} not found`);
        return res.status(404).json({ error: 'Student not found' });
      }

      console.log(`Student data: ${JSON.stringify(student)}`);
      return res.status(200).json(student);
    } catch (error) {
      console.error(`Error fetching student data: ${(error as Error).message}`);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
