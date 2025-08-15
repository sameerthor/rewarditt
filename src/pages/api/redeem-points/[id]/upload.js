import { parse } from "cookie";
import formidable from "formidable";
import FormData from "form-data";

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.auth_token || null;

  if (!token) return res.status(401).json({ error: "Not authenticated" });
  if (req.method !== "POST")
    return res.status(405).json({ error: `Method ${req.method} not allowed` });

  try {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Form parse error" });

      const file = files?.proof_image;
      if (!file) return res.status(400).json({ error: "No file uploaded" });

      const formData = new FormData();
      formData.append("proof_image", fs.createReadStream(file.filepath), file.originalFilename);

      const djangoRes = await fetch(
        `https://admin.rewarditt.com/api/redeem-points/${req.query.id}/upload/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.SECRET_KEY,
            ...formData.getHeaders(),
          },
          body: formData,
        }
      );

      const data = await djangoRes.json();
      return res.status(djangoRes.status).json(data);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
