import { parse } from 'cookie';

export default async function handler(req, res) {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    const apiKey = process.env.SECRET_KEY;
    console.log(token)
    if (!token) {
        return res.status(401).json({ error: "No auth token found" });
    }

    try {
        const response = await fetch("https://admin.rewarditt.com/api/user-profile/", {
            headers: {
                Authorization: `Bearer ${token}`,
                'x-api-key': apiKey,
            },
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        console.error("Proxy user-profile failed:", err);
        res.status(500).json({ error: "Proxy fetch failed" });
    }
}
