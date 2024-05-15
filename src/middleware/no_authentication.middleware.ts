import JWTManager from "@/utils/JWTManager";
import { NextFunction, Request, Response } from "express";

function noAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.cookies.token) {
    const accessToken = req.cookies.token;
    if (!accessToken || accessToken === "") {
      return next();
    } else {
      const jwtManager = new JWTManager();
      jwtManager
        .verifyToken(accessToken)
        .then((result) => {
          if (result) {
            res.status(401).json({
              message: "Unauthorized",
            });
          } else {
            return next();
          }
        })
        .catch((err) => {
          return next();
        });
    }
  } else if (req.headers.authorization) {
    const header = req.headers["authorization"]; // req.headers['x-access-token'];
    const accessToken = header ? header.split(" ")[1] : null;

    if (!accessToken) {
      return next();
    } else {
      const jwtManager = new JWTManager();
      jwtManager
        .verifyToken(accessToken)
        .then((result) => {
          if (result) {
            res.status(401).json({
              message: "Unauthorized",
            });
          } else {
            return next();
          }
        })
        .catch((err) => {
          return next();
        });
    }
  }

  next(); // Continue
}

export default noAuthenticationMiddleware;
