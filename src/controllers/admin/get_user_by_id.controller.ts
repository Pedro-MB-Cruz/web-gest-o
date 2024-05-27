import db from "@/prisma/prisma";
import { Response } from "express";

interface IGetUserByID extends RequestWithAuth {
  params: {
    id?: string;
  };
}

export default async function getUserById(req: IGetUserByID, res: Response) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "Missing id" });
  }

  const data = await db.user.findUnique({
    where: {
      id: parseInt(id),
    },
    select: {
      id: true,
      username: true,
      role: true,
      status: true,
      created_at: true,
      updated_at: true,
      _count: {
        select: { network: true },
      },
    },
  });

  if (!data) {
    return res.status(404).send({ error: "User not found" });
  }

  return res.status(200).send(data);
}
