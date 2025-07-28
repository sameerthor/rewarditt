import { withSessionRoute } from '@/lib/withSessionRoute';

export default withSessionRoute(async (req, res) => {
  const { email, password, code } = req.body;
  const saved = req.session.code;

  if (!saved || saved.email !== email || saved.code != code) {
    return res.status(400).json({ message: 'Invalid or expired code' });
  }

  // Optionally expire the code
  req.session.destroy();

  // TODO: Hash password & save to DB
  const myHeaders = new Headers();
myHeaders.append("x-api-key", "nBKpNrNUxhDIR9dkjIA95JtGplWrPNa4");
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "username": email.split('@')[0],
  "email": email,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://admin.rewarditt.com/users/", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
  return res.status(200).json({ message: 'Registered successfully' });
});
