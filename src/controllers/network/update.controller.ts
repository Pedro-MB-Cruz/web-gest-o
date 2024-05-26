import { z } from "zod";
import { createNetworkBodySchema } from "./create.controller";
import { JWTData } from "@/utils/JWTManager";
import { Response } from "express";
import db from "@/prisma/prisma";

const updateNetworkSchema = createNetworkBodySchema.partial();

type IUpdateNetworkRequestBody = z.infer<typeof updateNetworkSchema> & {
  userData: JWTData;
};

interface IUpdateNetworkRequest extends RequestWithAuth {
  body: IUpdateNetworkRequestBody;
  params: {
    id?: string;
  };
}

export default async function updateNetwork(
  req: IUpdateNetworkRequest,
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

  const network = await db.network.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!network) {
    return res.status(404).json({
      message: "Network not found",
    });
  }

  if (req.body.userData.role === "ADMIN") {
    const { name, ipEntrance, gateway } = req.body;
    try {
      const data = updateNetworkSchema.parse({
        name,
        ipEntrance,
        gateway,
      });

      const updatedNetwork = await db.network.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: data.name && data.name,
          ipEntrance: data.ipEntrance && data.ipEntrance,
          gateway: data.gateway && data.gateway,
        },
      });

      return res.status(200).json(updatedNetwork);
    } catch (error: Error | any) {
      return res.status(400).json({
        message: error.errors[0]?.message,
      });
    }
  }

  if (network.user_id !== req.body.userData.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  const { name, ipEntrance, gateway } = req.body;

  try {
    const data = updateNetworkSchema.parse({
      name,
      ipEntrance,
      gateway,
    });

    const updatedNetwork = await db.network.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        name: data.name && data.name,
        ipEntrance: data.ipEntrance && data.ipEntrance,
        gateway: data.gateway && data.gateway,
      },
    });

    return res.status(200).json(updatedNetwork);
  } catch (error: Error | any) {
    return res.status(400).json({
      message: error.errors[0]?.message,
    });
  }
}
