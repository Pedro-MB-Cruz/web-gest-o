import db from "@/prisma/prisma";
import { Request, Response } from "express";

interface IGetDeviceByIdRequest extends Request {
  params: {
    id?: string;
  };
}

export default async function getDeviceById(
  req: IGetDeviceByIdRequest,
  res: Response
) {
  const deviceId = req.params.id;

  if (!deviceId) {
    return res.status(400).json({
      message: "Device ID is required",
    });
  }

  const deviceIdInteger = parseInt(deviceId);

  const device = await db.device.findFirst({
    where: {
      id: deviceIdInteger,
    },
  });

  if (!device) {
    return res.status(404).json({
      message: "Device not found",
    });
  }

  return res.status(200).json({
    device,
  });
}
