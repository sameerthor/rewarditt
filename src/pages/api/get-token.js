import { parse } from 'cookie';

export default function handler(req, res) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.auth_token || null;
  res.status(200).json({ token });
  console.log(token)
}