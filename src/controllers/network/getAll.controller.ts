import db from "@/prisma/prisma";
import { Request, Response } from "express";

export default async function getAllNetworks(
  req: Request,
  res: Response
) {
  const data = await db.network.findMany({
    include: {
      _count: {
        select: {
          SubNetworks: true,
        },
      },
      SubNetworks: true,
    },
  });

  res.status(200).json(data);
}