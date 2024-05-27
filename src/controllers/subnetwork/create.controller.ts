import db from "@/prisma/prisma";
import { JWTData } from "@/utils/JWTManager";
import { Response } from "express";
import { z } from "zod";

export const createSubNetworkBodySchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .max(255),
  subnet: z
    .string({
      message: "IP Entrance is required",
    })
    .ip({
      version: "v4",
      message: "IP Entrance must be a valid IPv4 address",
    }),
  mask: z
    .string({
      message: "IP Entrance is required",
    })
    .ip({
      version: "v4",
      message: "IP Entrance must be a valid IPv4 address",
    }),
  gateway: z
    .string({
      message: "IP Entrance is required",
    })
    .ip({
      version: "v4",
      message: "IP Entrance must be a valid IPv4 address",
    }),
  dns: z
    .string({
      message: "IP Entrance is required",
    })
    .ip({
      version: "v4",
      message: "IP Entrance must be a valid IPv4 address",
    }),
});

type ICreateSubNetworkRequestBody = z.infer<
  typeof createSubNetworkBodySchema
> & {
  userData: JWTData;
};

interface ICreateSubNetworkRequest extends RequestWithAuth {
  body: ICreateSubNetworkRequestBody;
  params: {
    id?: string;
  };
}

export default async function createSubNetwork(
  req: ICreateSubNetworkRequest,
  res: Response
) {
  const { userData, ...rest } = req.body;

  const networkId = req.params.id;

  if (!networkId) {
    return res.status(400).json({
      message: "Network ID is required",
    });
  }

  const networkIdInt = parseInt(networkId);

  const network = await db.network.findUnique({
    where: {
      id: networkIdInt,
    },
  });

  if (!network) {
    return res.status(404).json({
      message: "Network not found",
    });
  }

  if (network.user_id !== userData.id && userData.role !== "ADMIN") {
    return res.status(403).json({
      message:
        "You don't have permission to create a subnetwork in this network",
    });
  }

  try {
    const data = createSubNetworkBodySchema.parse(rest);

    const subNetwork = await db.subNetwork.create({
      data: {
        ...data,
        Network: {
          connect: {
            id: network.id,
          },
        },
      },
    });

    return res.status(201).json(subNetwork);
  } catch (error: Error | any) {
    return res.status(400).json({
      message: error.errors[0]?.message,
    });
  }
}
