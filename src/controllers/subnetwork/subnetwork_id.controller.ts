import db from "@/prisma/prisma";
import { Response } from "express";

interface IGetSubNetworkByIDRequest extends RequestWithAuth {
  params: {
    id?: string;
  };
}

export default async function getSubNetworkById(
  req: IGetSubNetworkByIDRequest,
  res: Response
) {
  if (
    !req.params.id ||
    isNaN(parseInt(req.params.id)) ||
    parseInt(req.params.id) < 1
  ) {
    return res.status(400).json({
      message: "SubNetwork ID is required",
    });
  }

  const data = await db.subNetwork.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      Device: true,
      _count: {
        select: {
          Device: true,
        },
      },
    },
  });

  if (!data) {
    return res.status(404).json({
      message: "SubNetwork not found",
    });
  }

  return res.status(200).json(data);
}
