import { z } from "zod";
import { createDeviceBodySchema } from "./create.controller";
import { JWTData } from "@/utils/JWTManager";
import { Response } from "express";
import db from "@/prisma/prisma";

const updateDeviceSchema = createDeviceBodySchema.partial();

type IUpdateDeviceRequestBody = z.infer<typeof updateDeviceSchema> & {
  userData: JWTData;
};

interface IUpdateDeviceRequest extends RequestWithAuth {
  body: IUpdateDeviceRequestBody;
  params: {
    id?: string;
  };
}

export default async function updateDevice(
  req: IUpdateDeviceRequest,
  res: Response
) {
  if (
    !req.params.id ||
    isNaN(parseInt(req.params.id)) ||
    parseInt(req.params.id) < 1
  ) {
    return res.status(400).json({
      message: "Device ID is required",
    });
  }

  const device = await db.device.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      SubNetwork: {
        select: {
          Network: {
            select: {
              user_id: true,
            },
          },
        },
      },
    },
  });

  if (!device) {
    return res.status(404).json({
      message: "Device not found",
    });
  }

  const { userData, ...deviceData } = req.body;

  if (userData.role === "ADMIN") {
    try {
      const data = updateDeviceSchema.parse(deviceData);

      const updatedDevice = await db.device.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: data,
      });

      return res.status(200).json({
        device: updatedDevice,
      });
    } catch (error: Error | any) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }
  }

  if (device.SubNetwork.Network.user_id === req.body.userData.id) {
    try {
      const data = updateDeviceSchema.parse(deviceData);

      const updatedDevice = await db.device.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: data,
      });

      return res.status(200).json({
        device: updatedDevice,
      });
    } catch (error: Error | any) {
      return res.status(400).json({
        message: error.errors[0].message,
      });
    }
  }

  return res.status(403).json({
    message: "You do not have permission to update this device",
  });
}
