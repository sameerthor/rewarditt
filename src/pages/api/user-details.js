// pages/api/user-details.js
import { parse } from 'cookie';

export default async function handler(req, res) {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token || null;
console.log(token)
    if (!token) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {

        console.log(req.body)

        const djangoRes = await fetch(`https://admin.rewarditt.com/api/user-details/`, {
            method: req.method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'x-api-key': process.env.SECRET_KEY

            },
            body: req.method === 'PATCH' ? JSON.stringify(req.body) : undefined,
        });

        const data = await djangoRes.json();
        
        return res.status(djangoRes.status).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
}
