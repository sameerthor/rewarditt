import { parse } from 'cookie';

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.auth_token || null;

  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const djangoRes = await fetch('https://admin.rewarditt.com/redeem-points/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-api-key': process.env.SECRET_KEY
      }
    });

    const data = await djangoRes.json();
    return res.status(djangoRes.status).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
