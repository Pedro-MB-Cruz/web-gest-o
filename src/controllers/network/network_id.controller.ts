import db from "@/prisma/prisma";
import { Request, Response } from "express";

interface IGetNetworkByIDRequest extends Request {
  params: {
    id?: string;
  };
}

export default async function getNetworkById(
  req: IGetNetworkByIDRequest,
  res: Response
) {
  if (
    !req.params.id ||
    isNaN(parseInt(req.params.id)) ||
    parseInt(req.params.id) < 1
  ) {
    return res.status(400).json({
      message: "Network ID is required",
    });
  }

  const data = await db.network.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      _count: {
        select: {
          SubNetworks: true,
        },
      },
    },
  });

  if (!data) {
    return res.status(404).json({
      message: "Network not found",
    });
  }

  if (data._count?.SubNetworks === 0) {
    return res.status(200).json(data);
  }

  const subNetworks = await db.subNetwork.findMany({
    where: {
      network_id: parseInt(req.params.id),
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

  if (!subNetworks) {
    return res.status(200).json(data);
  }

  const dataWithSubNetworks = {
    ...data,
    SubNetworks: subNetworks,
  };

  return res.status(200).json(dataWithSubNetworks);
}
