import { z } from "zod";
import { createSubNetworkBodySchema } from "./create.controller";
import { JWTData } from "@/utils/JWTManager";
import { Response } from "express";
import db from "@/prisma/prisma";

const updateSubNetworkSchema = createSubNetworkBodySchema.partial();

type IUpdateNetworkRequestBody = z.infer<typeof updateSubNetworkSchema> & {
  userData: JWTData;
};

interface IUpdateNetworkRequest extends RequestWithAuth {
  body: IUpdateNetworkRequestBody;
  params: {
    id?: string;
  };
}

export default async function updateSubNetwork(
  req: IUpdateNetworkRequest,
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

  const subNetwork = await db.subNetwork.findUnique({
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

  if (!subNetwork) {
    return res.status(404).json({
      message: "SubNetwork not found",
    });
  }

  const { userData, ...subnetworkData } = req.body;

  if (req.body.userData.role === "ADMIN") {
    try {
      const data = updateSubNetworkSchema.parse(subnetworkData);

      const updatedSubNetwork = await db.subNetwork.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: data.name && data.name,
          subnet: data.subnet && data.subnet,
          mask: data.mask && data.mask,
          gateway: data.gateway && data.gateway,
          dns: data.dns && data.dns,
        },
      });

      return res.status(200).json(updatedSubNetwork);
    } catch (error: Error | any) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }
  }

  if (subNetwork.Network.user_id === req.body.userData.id) {
    try {
      const data = updateSubNetworkSchema.parse(subnetworkData);

      const updatedSubNetwork = await db.subNetwork.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: data.name && data.name,
          subnet: data.subnet && data.subnet,
          mask: data.mask && data.mask,
          gateway: data.gateway && data.gateway,
          dns: data.dns && data.dns,
        },
      });

      return res.status(200).json(updatedSubNetwork);
    } catch (error: Error | any) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }
  }

  return res.status(403).json({
    message: "You don't have permission to update this SubNetwork",
  });
}
