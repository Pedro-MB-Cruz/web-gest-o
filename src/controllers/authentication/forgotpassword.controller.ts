import { Request, Response } from "express";

export default async function forgotPassword(req: Request, res: Response) {
  res.status(501).json({
    message: "Not implemented",
  });
}
