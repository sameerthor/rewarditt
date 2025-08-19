// pages/logout.js
import { serialize } from "cookie";

export async function getServerSideProps({ res }) {
  // Expire the auth cookie
  res.setHeader(
    "Set-Cookie",
    serialize("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      path: "/",
      maxAge: 0, // delete now
    })
  );

  return {
    redirect: { destination: "/login", permanent: false },
  };
}

// This page never renders because we immediately redirect.
export default function Logout() { return null; }
