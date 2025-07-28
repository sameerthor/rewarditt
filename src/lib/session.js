
export const sessionOptions = {
  password: process.env.SESSION_SECRET || 'your-secure-password-that-is-at-least-32-characters-long',
  cookieName: "rewarditt_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
