import { withSessionRoute } from '@/lib/withSessionRoute';
import nodemailer from 'nodemailer';
import axios from 'axios';

export default withSessionRoute(async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });

    const response = await axios.get(`http://admin.rewarditt.com/users/?email=${email}`, {
        headers: {
            'x-api-key': process.env.SECRET_KEY
        }
    });
    console.log(response.data.length )
    if (response.data.length > 0) {
        return res.status(409).json({ message: "Email already registered." });
    }

    const code = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    req.session.code = { email, code, createdAt: Date.now() };
    await req.session.save();

    try {
        const transporter = nodemailer.createTransport({
            host: "admin.rewarditt.com",
            port: 587,         // ✅ use 587 instead of 465
            secure: false,     // ✅ false for TLS,
            auth: {
                user: "noreply@admin.rewarditt.com",
                pass: "Ayan@786"
            }
        });

        await transporter.sendMail({
            from: '"Rewarditt" <noreply@admin.rewarditt.com>',
            to: email,
            subject: "Your verification code",
            text: `Your code is: ${code}`
        });

        return res.status(200).json({ message: 'Code sent' });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Email send failed' });
    }
});
