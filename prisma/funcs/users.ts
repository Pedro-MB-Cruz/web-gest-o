import { prisma } from "@p/seed.prisma";
import bcrypt from "bcrypt";

export default async function createUserSeed() {
  if ((await prisma.user.count()) === 0) {
    const defaultPassword = "!Senha123";
    await prisma.user.createMany({
      data: [
        {
          username: "admin",
          password: await bcrypt.hash(defaultPassword, 10),
          role: "ADMIN",
        },
        {
          username: "user1",
          password: await bcrypt.hash(defaultPassword, 10),
          role: "TECHNICIAN",
        },
        {
          username: "user2",
          password: await bcrypt.hash(defaultPassword, 10),
          role: "TECHNICIAN",
        },
        {
          username: "user3",
          password: await bcrypt.hash(defaultPassword, 10),
        },
        {
          username: "user4",
          password: await bcrypt.hash(defaultPassword, 10),
        },
      ],
    });
  }
}
