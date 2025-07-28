import { parse } from 'cookie';

export default async function handler(req, res) {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    const apiKey = process.env.SECRET_KEY;
    console.log(token)

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        const response = await fetch("https://admin.rewarditt.com/api/bank-detail/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                "x-api-key": apiKey,
            },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (err) {
        console.error("Proxy bank-detail failed:", err);
        res.status(500).json({ error: "Proxy post failed" });
    }
}
