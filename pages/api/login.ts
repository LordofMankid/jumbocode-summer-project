import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Fetch the JWT from the external API
    try {
      const response = await fetch(
        'https://tl-onboarding-project-dxm7krgnwa-uc.a.run.app/login',
        {
          method: 'POST',
          body: JSON.stringify({ username, password })
        }
      );

      const data = await response.json();

      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: `Internal Server Error ${username + password}` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
