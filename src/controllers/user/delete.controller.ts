import db from "@/prisma/prisma";
import { Response } from "express";

export default async function deleteUser(req: RequestWithAuth, res: Response) {
  const { userData } = req.body;

  try {
    await db.user.update({
      where: {
        id: userData.id,
      },
      data: {
        status: "INACTIVE",
      },
    });

    // TODO: Should we delete all the Networks also or just deactivate the user?
    // await db.network.deleteMany({
    //     where: {
    //         user_id: userData.id
    //     }
    // });

    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "User deleted" });
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message });
  }
}
