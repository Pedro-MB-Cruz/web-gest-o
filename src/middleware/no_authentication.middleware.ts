import JWTManager from "@/utils/JWTManager";
import { NextFunction, Request, Response } from "express";
import { isBrowserCall } from "./helper";

async function noAuthenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let loggedIn = false;
  const isBrowser = isBrowserCall(req);
  if (req.cookies.token) {
    const accessToken = req.cookies.token;
    if (accessToken && accessToken !== "") {
      const jwtManager = new JWTManager();
      await jwtManager
        .verifyToken(accessToken)
        .then((result) => {
          if (result) {
            loggedIn = true;
          }
        })
        .catch((err) => {});
    }
  } else if (req.headers.authorization) {
    const header = req.headers["authorization"]; // req.headers['x-access-token'];
    const accessToken = header ? header.split(" ")[1] : null;

    if (accessToken) {
      const jwtManager = new JWTManager();
      await jwtManager
        .verifyToken(accessToken)
        .then((result) => {
          if (result) {
            loggedIn = true;
          }
        })
        .catch((err) => {});
    }
  }
  if (loggedIn) {
    if (isBrowser) return res.status(401).redirect("/p");
    else return res.status(401).json({ message: "Unauthorized" });
  } else next();
}

export default noAuthenticationMiddleware;
