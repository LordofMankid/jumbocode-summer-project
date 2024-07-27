import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Fetch the JWT from the external API
    console.log('YOOO');
    const { messages, token } = req.body;
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const response = await fetch(
        'https://tl-onboarding-project-dxm7krgnwa-uc.a.run.app/prompt',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}` // Add your JWT here!
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: messages
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      // console.log(res);
      console.log(error);
      res.status(500).json({ error: `Internal Server Error` });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
