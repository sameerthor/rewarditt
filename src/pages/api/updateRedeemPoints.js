import { parse } from 'cookie';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    const apiKey = process.env.SECRET_KEY;
    try {
        // Forward request to Django API with the same cookie
        const djangoRes = await fetch(`https://admin.rewarditt.com/api/update_redeem_points/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
                'x-api-key': apiKey,
            },
            body: JSON.stringify(req.body),
        });

        const data = await djangoRes.json();
        return res.status(djangoRes.status).json(data);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
