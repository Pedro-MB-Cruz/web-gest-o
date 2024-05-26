import { Response } from "express";

export default async function me(req: RequestWithAuth, res: Response) {
  return res.status(200).json(req.body.userData);
}
