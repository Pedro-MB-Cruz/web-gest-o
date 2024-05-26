import db from "@/prisma/prisma";
import { Response } from "express";

export default async function getUserNetworks(
  req: RequestWithAuth,
  res: Response
) {
  const data = await db.network.findMany({
    where: {
      user_id: req.body.userData.id,
    },
    include: {
      _count: {
        select: {
          SubNetworks: true,
        },
      },
    },
  });

  res.status(200).json(data);
}
