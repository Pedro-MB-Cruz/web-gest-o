import { NextFunction, Response } from "express";

async function technicianOnlyMiddleware(
  req: RequestWithAuth,
  res: Response,
  next: NextFunction
) {
  if (
    req.body.userData.role === "TECHNICIAN" ||
    req.body.userData.role === "ADMIN"
  ) {
    return next();
  }
  return res.status(401).json({
    message: "Unauthorized",
  });
}

export default technicianOnlyMiddleware;
