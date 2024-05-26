import { NextFunction, Response } from "express";

async function adminOnlyMiddleware(
  req: RequestWithAuth,
  res: Response,
  next: NextFunction
) {
  if (req.body.userData.role === "ADMIN") {
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized",
  });
}

export default adminOnlyMiddleware;
