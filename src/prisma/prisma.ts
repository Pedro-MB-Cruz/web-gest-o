import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({
  log: ["query", "warn", "error", "info"],
  errorFormat: "pretty",
});

export default db;
