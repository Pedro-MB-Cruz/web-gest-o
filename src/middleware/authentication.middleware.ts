import { NextFunction, Request, Response } from "express";

function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // TODO: Middleware (Login Verification)
  next(); // Continue
}

export default authenticationMiddleware;
