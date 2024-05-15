import JWTManager from "@/utils/JWTManager";
import { NextFunction, Request, Response } from "express";

async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.cookies.token) {
    const accessToken = req.cookies.token;
    if (!accessToken || accessToken === "") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    try {
      const result = await new JWTManager().verifyToken(accessToken);
      req.body.userData = result;

      return next();
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } else if (req.headers.authorization) {
    const accessToken = req.headers["authorization"]; // req.headers['x-access-token'];

    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    try {
      const bearer = accessToken.split(" ");
      const bearerToken = bearer[1];

      const result = await new JWTManager().verifyToken(bearerToken);
      req.body.userData = result;

      return next();
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
}

export default authenticationMiddleware;
