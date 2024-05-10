import db from "@/prisma/prisma";
import { sha512 } from "js-sha512";
import { Request, Response } from "express";
import z from "zod";

const LoginSchema = z.object({
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

interface RequestLogin extends Request {
  body: z.infer<typeof LoginSchema>;
}

export async function login(req: RequestLogin, res: Response) {
  // Get Data from the body
  const { username, password } = req.body;
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
    });
  // If user not found
  if (!dbData) {
    return res.status(404).json({
      message: "Username or password is incorrect",
    });
  }
  // Check password
  const hashedPassword = sha512(data.password);
  if (hashedPassword !== dbData.password) {
    return res.status(404).json({
      message: "Username or password is incorrect",
    });
  }
  // Create session
  req.session.save(() => {
    req.session.logged_in = true;
    req.session.user = {
      id: dbData.id,
      username: dbData.username,
      admin: dbData.admin,
    };
  });

  return res.status(200).json({
    message: "Login success",
    data: {
      username: dbData.username,
      admin: dbData.admin,
    },
  });
}
