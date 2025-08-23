// pages/api/login.js
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    const apiRes = await fetch('https://admin.rewarditt.com/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
                    'x-api-key': process.env.SECRET_KEY


      },
      body: JSON.stringify({ email, password }),
    });

    const data = await apiRes.json();
console.log(data)
    if (!apiRes.ok) {
      return res.status(apiRes.status).json({ error: data.detail || "Login failed" });
    }

    const token = data.access;

    // Set token in cookie
res.setHeader('Set-Cookie', serialize('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 60 * 60 * 2, // 2 hour
      path: '/',
    }));

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

