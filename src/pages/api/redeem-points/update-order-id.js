// pages/api/redeempoints/update-order-id.js
import axios from "axios";
import { parse } from 'cookie';

export default async function handler(req, res) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { id, order_id } = req.body;
        const cookies = parse(req.headers.cookie || '');
        const token = cookies.auth_token;
        const apiKey = process.env.SECRET_KEY;
        const response = await axios.patch(
            `https://admin.rewarditt.com/redeem-points/${id}/update-order-id/`,
            { order_id },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'x-api-key': apiKey,
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error updating order id:", error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data || "Something went wrong",
        });
    }
}
