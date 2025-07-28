import { getIronSession } from "iron-session";
import { sessionOptions } from "./session";

// Wrap any Next.js API handler
export function withSessionRoute(handler) {
  return async function (req, res) {
    req.session = await getIronSession(req, res, sessionOptions);
    return handler(req, res);
  };
}
