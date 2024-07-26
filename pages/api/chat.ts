import { getAllChats, postChat } from '@/lib/api/chat';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { content, role } = req.body;
    if (content && role) {
      try {
        const chat = await postChat(content, role);
        res.status(200).json(chat);
      } catch (e) {
        if (role === 'user') {
          res.status(500).json({ error: 'Unable to submit message' });
        } else {
          res.status(500).json({ error: 'Unable to receive message' });
        }
      }
    }
  } else if (req.method === 'GET') {
    try {
      const chats = await getAllChats();
      res.status(200).json(chats);
    } catch (e) {
      res.status(500).json({ error: 'Unable to fetch chat logs' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
