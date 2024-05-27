import { Request } from "express";

export function isBrowserCall(req: Request) {
  const contentType = req.headers["content-type"];
  if (contentType) {
    return contentType.includes("text/html");
  }
  const accept = req.headers["accept"];
  if (accept) {
    return accept.includes("text/html");
  }
  const userAgent = req.headers["user-agent"];
  if (userAgent) {
    return userAgent.includes("Mozilla") || userAgent.includes("Chrome");
  }
  return false;
}
