import db from "@/prisma/prisma";
import { JWTData } from "@/utils/JWTManager";
import { Response } from "express";
import { z } from "zod";

export const createDeviceBodySchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .max(255),
  description: z.string({
    message: "Description is required",
  }),
  ports: z
    .number({
      message: "IP Entrance is required",
    })
    .min(1, {
      message: "Port must be greater than 0",
    }),
  location: z.string({
    message: "Location is required",
  }),
  ip: z
    .string({
      message: "IP is required",
    })
    .ip({
      version: "v4",
      message: "IP must be a valid IPv4 address",
    }),
  mac: z
    .string({
      message: "Mac Address is required",
    })
    .length(17, {
      message: "Mac Address must be 17 characters long",
    })
    .refine(
      (value) => {
        return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(value);
      },
      {
        message: "Mac Address must be in the format XX:XX:XX:XX:XX:XX",
      }
    ),
});

type ICreateDeviceRequestBody = z.infer<typeof createDeviceBodySchema> & {
  userData: JWTData;
};

interface ICreateDeviceRequest extends RequestWithAuth {
  body: ICreateDeviceRequestBody;
  params: {
    id?: string;
  };
}

export default async function createDevice(
  req: ICreateDeviceRequest,
  res: Response
) {
  const { userData, ...deviceData } = req.body;

  const subNetworkId = req.params.id;

  if (!subNetworkId) {
    return res.status(400).json({
      message: "SubNetwork ID is required",
    });
  }

  const subNetworkIdInteger = parseInt(subNetworkId);

  const subNetwork = await db.subNetwork.findFirst({
    where: {
      id: subNetworkIdInteger,
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

  if (subNetwork.Network.user_id !== userData.id && userData.role !== "ADMIN") {
    return res.status(403).json({
      message:
        "You do not have permission to create devices in this SubNetwork",
    });
  }

  try {
    const deviceDataParsed = createDeviceBodySchema.parse(deviceData);

    const device = await db.device.create({
      data: {
        ...deviceDataParsed,
        SubNetwork: {
          connect: {
            id: subNetworkIdInteger,
          },
        },
      },
    });

    return res.status(201).json(device);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "An error occurred while creating the device",
    });
  }
}
