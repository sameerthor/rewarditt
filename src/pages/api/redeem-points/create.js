import { parse } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.auth_token || null;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { points } = req.body;
  const MIN_REDEEM = parseInt(process.env.NEXT_PUBLIC_MIN_REDEEM_POINTS || "1000");

  if (!points || points < MIN_REDEEM) {
    return res.status(400).json({ error: `Minimum redeem points is ${MIN_REDEEM}` });
  }

  try {
    const djangoRes = await fetch("https://admin.rewarditt.com/api/redeem-requests/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "x-api-key": process.env.SECRET_KEY,
      },
      body: JSON.stringify({ points }),
    });

    const data = await djangoRes.json();
    return res.status(djangoRes.status).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
