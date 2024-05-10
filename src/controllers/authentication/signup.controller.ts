import db from "@/prisma/prisma";
import { sha512 } from "js-sha512";
import { Request, Response } from "express";
import z from "zod";

const RegisterSchema = z.object({
  username: z.string({
    message: "Invalid username",
  }),
  password: z
    .string({
      message: "Password must be at least 8 characters long",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
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
    const hashedPassword = sha512(data.password);
    // Create user
    const user = await db.user
      .create({
        data: {
          username: data.username,
          password: hashedPassword,
        },
      })
      .catch((err) => {
        // Handle Error
        throw new Error(err);
      });
    // If user not created
    if (!user) {
      throw new Error("User not created");
    }
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("REGISTER: ", error);
    return res.status(400).json({
      message: error,
    });
  }
}
