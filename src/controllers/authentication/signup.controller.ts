import db from "@/prisma/prisma";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import z from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const RegisterSchema = z.object({
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

interface RequestRegister extends Request {
  body: z.infer<typeof RegisterSchema>;
}

export default async function register(req: RequestRegister, res: Response) {
  // Get Data from the body
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Invalid data");
    }
    // Validate Data (Auto invalid data will throw an error)
    const data = RegisterSchema.parse({ username, password });
    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // Create user
    const user = await db.user
      .create({
        data: {
          username: data.username,
          password: hashedPassword,
        },
      })
      .catch((err: Error | any) => {
        if (err instanceof PrismaClientKnownRequestError) {
          // Handle Prisma Error
          if (err.code === "P2002") {
            throw new Error("Error creating user");
          }
        }
        // Handle Error
        throw new Error(
          err instanceof PrismaClientKnownRequestError
            ? err.message
            : "Internal Server Error"
        );
      });
    // If user not created
    if (!user) {
      throw new Error("User not created");
    }
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error: Error | any) {
    console.error("REGISTER: ", error);
    return res.status(400).json({
      message: error.message,
    });
  }
}
