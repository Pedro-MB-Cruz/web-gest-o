import JWTManager from "@/utils/JWTManager";
import { NextFunction, Request, Response } from "express";
import { isBrowserCall } from "./helper";

async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isBrowser = isBrowserCall(req);
  if (req.cookies.token) {
    const accessToken = req.cookies.token;
    if (!accessToken || accessToken === "") {
      if (isBrowser) return res.status(401).redirect("/signin");
      else return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const result = await new JWTManager().verifyToken(accessToken);
      req.body.userData = result;

      return next();
    } catch (err) {
      if (isBrowser) return res.status(401).redirect("/signin");
      else return res.status(401).json({ message: "Unauthorized" });
    }
  } else if (req.headers.authorization) {
    const accessToken = req.headers["authorization"]; // req.headers['x-access-token'];

    if (!accessToken) {
      if (isBrowser) return res.status(401).redirect("/signin");
      else return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const bearer = accessToken.split(" ");
      const bearerToken = bearer[1];

      const result = await new JWTManager().verifyToken(bearerToken);
      req.body.userData = result;

      return next();
    } catch (err) {
      if (isBrowser) return res.status(401).redirect("/signin");
      else return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    if (isBrowser) return res.status(401).redirect("/signin");
    else return res.status(401).json({ message: "Unauthorized" });
  }
}

export default authenticationMiddleware;
