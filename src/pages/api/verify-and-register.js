import { withSessionRoute } from '@/lib/withSessionRoute';

export default withSessionRoute(async (req, res) => {
  const { email, password, code } = req.body;
  const saved = req.session.code;

  if (!saved || saved.email !== email || saved.code != code) {
    return res.status(400).json({ message: 'Invalid or expired code' });
  }

  // Expire the verification session
  req.session.destroy();

  // Read referral code cookie (if exists)
  const refBy = req.cookies?.referral_code || null;

  // TODO: Hash password before sending to DB if needed
  const myHeaders = new Headers();
  myHeaders.append("x-api-key", "nBKpNrNUxhDIR9dkjIA95JtGplWrPNa4");
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    username: email.split('@')[0],
    email: email,
    password: password,
    ref_by: refBy   // 👈 attach referral code if exists
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await fetch("https://admin.rewarditt.com/users/", requestOptions);
    const result = await response.text();
    console.log("User created:", result);
    res.setHeader("Set-Cookie", "referral_code=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax");

    return res.status(200).json({ message: 'Registered successfully' });
  } catch (error) {
    console.error("Registration failed:", error);
    return res.status(500).json({ message: 'Registration failed' });
  }
});
