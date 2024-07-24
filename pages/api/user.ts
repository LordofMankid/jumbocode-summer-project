import { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers, getUserById, addUser, UserProps } from '@/lib/api/user';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { id } = req.query;

    if (id) {
      // Fetch a single user by ID
      try {
        const user = await getUserById(id as string);
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      } catch (e) {
        res.status(500).json({ error: 'Unable to fetch user' });
      }
    } else {
      // Fetch all users
      try {
        const users = await getAllUsers();
        res.status(200).json(users);
      } catch (e) {
        res.status(500).json({ error: 'Unable to fetch users' });
      }
    }
  } else if (req.method === 'POST') {
    try {
      const user: UserProps = req.body;
      const newUser = await addUser(user);
      res.status(201).json(newUser);
    } catch (e) {
      res.status(500).json({ error: 'Unable to add user' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
