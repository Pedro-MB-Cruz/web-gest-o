import { Request, Response } from "express";

export default async function logout(req: Request, res: Response) {
  if (!req.session.logged_in || !req.session.user) {
    return res.status(401).json({
      message: "You are not logged in",
    });
  }
  req.session.destroy(() => {
    res.status(200).json({
      message: "Logout success",
    });
  });
}
