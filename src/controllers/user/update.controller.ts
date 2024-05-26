import { Response } from "express";
import { z } from "zod";
import { RegisterSchema } from "../authentication/signup.controller";
import JWTManager, { JWTData } from "@/utils/JWTManager";
import db from "@/prisma/prisma";
import PasswordManager from "@/utils/PasswordManager";

// Make everything optional
const UpdateUserSchema = RegisterSchema.partial();

type UpdateUserRequestBody = z.infer<typeof UpdateUserSchema> & {
  userData: JWTData;
};

interface UpdateUserRequest extends RequestWithAuth {
  body: UpdateUserRequestBody;
}

export default async function updateUser(
  req: UpdateUserRequest,
  res: Response
) {
  const { username, password, userData } = req.body;

  try {
    const data = UpdateUserSchema.parse({ username, password });
    // Update user data
    const updatedUser = await db.user.update({
      where: {
        id: userData.id,
      },
      data: {
        username: data.username && data.username,
        password:
          data.password && (await PasswordManager.hashPassword(data.password)),
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    // Update token
    const token = new JWTManager().generateToken({
      data: {
        id: updatedUser.id,
        username: updatedUser.username,
        role: updatedUser.role,
      },
    });

    return res
      .clearCookie("token")
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: JWTManager.getExpiresInDate(),
      })
      .status(200)
      .json(updatedUser);
  } catch (error: Error | any) {
    return res.status(400).json({ message: error.message });
  }
}
