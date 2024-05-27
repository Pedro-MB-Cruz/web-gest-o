import db from "@/prisma/prisma";
import { JWTData } from "@/utils/JWTManager";
import { Response } from "express";
import { z } from "zod";
import { RegisterSchema } from "../authentication/signup.controller";
import { AccountStatus, Roles } from "@prisma/client";
import PasswordManager from "@/utils/PasswordManager";

const updateUserSchema = RegisterSchema.extend({
  role: z.nativeEnum(Roles),
  status: z.nativeEnum(AccountStatus),
});

const updateUserSchemaPartial = updateUserSchema.partial();

type IUpdateUserRequestBody = z.infer<typeof updateUserSchemaPartial> & {
  userData: JWTData;
};

interface IUpdateUserRequest extends RequestWithAuth {
  body: IUpdateUserRequestBody;
  params: {
    id?: string;
  };
}

export default async function updateUser(
  req: IUpdateUserRequest,
  res: Response
) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ error: "Missing id" });
  }

  const { userData, ...rest } = req.body;

  try {
    const { password, ...newUserData } = updateUserSchemaPartial.parse(rest);

    const data = await db.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        password: password && (await PasswordManager.hashPassword(password)),
        ...newUserData,
      },
    });

    return res.status(200).send(data);
  } catch (error: Error | any) {
    return res.status(400).send({ error: error.errors });
  }
}
