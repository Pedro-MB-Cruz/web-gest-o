import db from "@/prisma/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import z from "zod";
import JWTManager from "@/utils/JWTManager";

const LoginSchema = z.object({
  username: z
    .string({
      message: "Invalid username",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    }),
  password: z
    .string({
      message: "Password must be at least 8 characters long",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    })
    .max(64, {
      message: "Password must be at most 64 characters long",
    })
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,64}$/,
      {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character",
      }
    ),
});

interface RequestLogin extends Request {
  body: z.infer<typeof LoginSchema>;
}

export default async function login(req: RequestLogin, res: Response) {
  try {
    // Get Data from the body
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error("Invalid data");
    }

    // Validate Data (Auto invalid data will throw an error)
    const data = LoginSchema.parse({ username, password });
    // Valid Data
    const dbData = await db.user
      .findUnique({
        where: {
          username: data.username,
        },
        select: {
          id: true,
          password: true, // Needed to check password
          username: true,
          admin: true,
        },
      })
      .catch((err) => {
        // Handle Error
        console.error(err);
        throw new Error(err);
      });
    // If user not found
    if (!dbData) {
      throw new Error("Username or password is incorrect");
    }
    // Check password
    const match = await bcrypt.compare(data.password, dbData.password);
    if (!match) {
      throw new Error("Username or password is incorrect");
    }

    const token = new JWTManager().generateToken({
      data: {
        id: dbData.id,
        username: dbData.username,
        admin: dbData.admin,
      },
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: JWTManager.getExpiresInDate(),
    });

    return res.status(200).json({
      message: "Login success",
      data: {
        username: dbData.username,
        admin: dbData.admin,
      },
      accessToken: token,
    });
  } catch (error) {
    console.error("LOGIN: ", error);
    return res.status(400).json({
      message: error,
    });
  }
}