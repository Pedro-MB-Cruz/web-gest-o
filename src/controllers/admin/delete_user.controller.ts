import db from "@/prisma/prisma";
import { Response } from "express";

interface IDeleteUserRequest extends RequestWithAuth {
  params: {
    id?: string;
  };
}

export default async function deleteUser(
  req: IDeleteUserRequest,
  res: Response
) {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send({ error: "Missing id" });
  }

  await db.user.delete({
    where: {
      id: parseInt(id),
    },
  });

  return res.status(200).send({ message: "User deleted" });
}
