import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

interface NotificationRequest {
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body as NotificationRequest;
    try {
      await prisma.notification.create({
        data: { message },
      });
      res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error: any) { // Using 'any' to bypass TypeScript's strict typing here
      console.error('Failed to send notification:', error.message); // Assuming 'error' has a 'message' field
      res.status(500).json({ error: 'Failed to send notification', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
