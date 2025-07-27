// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.status(405).send({ message: 'Only POST requests allowed' })
      return
    }
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("x-api-key", process.env.SECRET_KEY);
      const raw = JSON.stringify(req.body);
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      const response = await fetch("https://admin.rewarditt.com/stores/", requestOptions)
  
      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }
  
      const data = await response.json();
      res.status(200).json({ data });
    } catch (err) {
      res.status(400).json({ err });
    }
  }
  