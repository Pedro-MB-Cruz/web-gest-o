import db from "@/prisma/prisma";
import { JWTData } from "@/utils/JWTManager";
import { Response } from "express";
import { z } from "zod";

export const createNetworkBodySchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .max(255),
  ipEntrance: z
    .string({
      message: "IP Entrance is required",
    })
    .ip({
      version: "v4",
      message: "IP Entrance must be a valid IPv4 address",
    }),
  gateway: z
    .string({
      message: "Gateway is required",
    })
    .ip({
      version: "v4",
      message: "Gateway must be a valid IPv4 address",
    }),
});

type ICreateNetworkRequestBody = z.infer<typeof createNetworkBodySchema> & {
  userData: JWTData;
};

interface ICreateNetworkRequest extends RequestWithAuth {
  body: ICreateNetworkRequestBody;
}

export default async function createNetwork(
  req: ICreateNetworkRequest,
  res: Response
) {
  const { name, ipEntrance, gateway, userData } = req.body;

  try {
    const data = createNetworkBodySchema.parse({
      name,
      ipEntrance,
      gateway,
    });

    const network = await db.network.create({
      data: {
        name: data.name,
        ipEntrance: data.ipEntrance,
        gateway: data.gateway,
        user_id: userData.id,
      },
    });

    return res.status(201).json(network);
  } catch (error: Error | any) {
    return res.status(400).json({
      message: error.errors[0]?.message,
    });
  }
}
