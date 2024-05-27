import db from "@/prisma/prisma";
import { Response } from "express";

interface IDeleteDeviceRequest extends RequestWithAuth {
  params: {
    id?: string;
  };
}

export default async function deleteDevice(
  req: IDeleteDeviceRequest,
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

  // Check if the user is an ADMIN (force delete)
  if (req.body.userData.role === "ADMIN") {
    await db.device.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    return res.status(204).send();
  }

  // Check if the user is the owner of the device
  if (device.SubNetwork.Network.user_id !== req.body.userData.id) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }

  await db.device.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });

  return res.status(204).send();
}
