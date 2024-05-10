import { NextFunction, Request, Response } from "express";

function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.logged_in) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  next(); // Continue
}

export default authenticationMiddleware;
