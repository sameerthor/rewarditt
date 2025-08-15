// src/pages/api/redeem-points/[id]/upload.js
import formidable from "formidable";
import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";
import { parse } from "cookie";

export const config = {
  api: { bodyParser: false }, // important for file uploads
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.auth_token || null;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  const { id } = req.query;

  // Temp upload directory
  const uploadDir = path.join(process.cwd(), "tmp");
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const form = formidable({ keepExtensions: true, uploadDir });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form parse error" });

    if (!files.proof_image) return res.status(400).json({ error: "No file uploaded" });

    // Handle array or single file
    const fileArray = Array.isArray(files.proof_image) ? files.proof_image : [files.proof_image];
    const file = fileArray[0];

    if (!file || !file.filepath) return res.status(400).json({ error: "Invalid file" });

    try {
      const formData = new FormData();
      formData.append("proof_image", fs.createReadStream(file.filepath), file.originalFilename);

      // Send to Django
      const djangoRes = await axios.post(
        `https://admin.rewarditt.com/redeem-points/${id}/upload/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-api-key": process.env.SECRET_KEY,
            ...formData.getHeaders(),
          },
        }
      );

      // Return Django response
      return res.status(djangoRes.status).json(djangoRes.data);
    } catch (uploadErr) {
      console.error("Upload error:", uploadErr.response?.data || uploadErr.message);
      return res.status(500).json({ error: uploadErr.response?.data || "Upload failed" });
    } finally {
      // Optionally delete temp file
      fs.unlink(file.filepath, (e) => e && console.error("Temp file delete error:", e));
    }
  });
}
