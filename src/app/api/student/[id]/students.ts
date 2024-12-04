import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma'; // Adjust the import path as necessary

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id as string, 10) },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json(student);
  }
  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
