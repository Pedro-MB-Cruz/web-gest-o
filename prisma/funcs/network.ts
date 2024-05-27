import { prisma } from "@p/seed.prisma";

export default async function createNetworkSeed() {
  if ((await prisma.network.count()) === 0) {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          {
            role: "TECHNICIAN",
          },
          {
            role: "ADMIN",
          },
        ],
      },
      select: {
        id: true,
      },
    });
    // Create Networks
    await prisma.network.createMany({
      data: [
        {
          name: "Network 1",
          gateway: "192.168.1.1",
          ipEntrance: "192.168.1.0",
          user_id: users[1].id,
        },
        {
          name: "Network 2",
          gateway: "192.168.1.1",
          ipEntrance: "192.168.1.0",
          user_id: users[2].id,
        },
        {
          name: "Network 3",
          gateway: "192.168.1.1",
          ipEntrance: "192.168.1.0",
          user_id: users[1].id,
        },
      ],
    });
  }
}
