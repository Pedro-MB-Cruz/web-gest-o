import db from "@/prisma/prisma";
import { Response } from "express";

interface IDeleteSubNetworkRequest extends RequestWithAuth {
  params: {
    id?: string;
  };
}

export default async function deleteNetwork(
  req: IDeleteSubNetworkRequest,
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

  const network = await db.subNetwork.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      Network: {
        select: {
          user_id: true,
        },
      },
    },
  });

  if (!network) {
    return res.status(404).json({
      message: "SubNetwork not found",
    });
  }

  // Check if the user is an ADMIN (force delete)
  if (req.body.userData.role === "ADMIN") {
    await db.subNetwork.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    return res.status(204).send();
  }

  // Check if the user is the owner of the network
  if (network.Network.user_id !== req.body.userData.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await db.subNetwork.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  return res.status(204).send();
}
