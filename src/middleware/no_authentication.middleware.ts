import { NextFunction, Request, Response } from "express";

function noAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.session.logged_in) {
    return res.status(401).json({
      message: "You are logged in",
    });
  }
  next(); // Continue
}

export default noAuthenticationMiddleware;
