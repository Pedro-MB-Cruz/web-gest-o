import { Request, Response } from "express";

export default async function logout(req: Request, res: Response) {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logged out",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
