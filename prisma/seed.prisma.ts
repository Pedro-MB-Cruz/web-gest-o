import { PrismaClient } from "@prisma/client";
import createUserSeed from "./funcs/users";
import createNetworkSeed from "./funcs/network";

export const prisma = new PrismaClient();
async function main() {
  await createUserSeed();
  await createNetworkSeed();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
