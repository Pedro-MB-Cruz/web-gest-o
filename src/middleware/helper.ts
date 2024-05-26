import { Request } from "express";

export function isBrowserCall(req: Request) {
  const userAgent = req.headers["user-agent"];
  if (userAgent) {
    return userAgent.includes("Mozilla") || userAgent.includes("Chrome");
  }
  return false;
}
