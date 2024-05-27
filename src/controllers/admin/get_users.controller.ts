import db from "@/prisma/prisma";
import { Response } from "express";
import { z } from "zod";

const getUsersSchema = z.object({
  search: z.string().optional(),
  page: z.string().optional(),
  perPage: z.string().optional(),
});

interface IGetUsers extends RequestWithAuth {
  query: z.infer<typeof getUsersSchema>;
}

export default async function getAllUsers(req: IGetUsers, res: Response) {
  try {
    let { search, page, perPage } = getUsersSchema.parse(req.query);

    page ??= "1"; // default page is 1
    perPage ??= "15"; // default perPage is 15

    let pageNumber = parseInt(page);
    let perPageNumber = parseInt(perPage);

    if (isNaN(pageNumber) || isNaN(perPageNumber)) {
      return res.status(400).send({ error: "Invalid page or perPage" });
    }

    if (pageNumber < 1) {
      pageNumber = 1;
    }
    if (perPageNumber < 1) {
      perPageNumber = 15;
    }

    const data = await db.$transaction([
      db.user.count({
        where: {
          OR: [
            {
              username: {
                contains: search || "",
              },
            },
          ],
        },
      }),
      db.user.findMany({
        where: {
          OR: [
            {
              username: {
                contains: search || "",
              },
            },
          ],
        },
        select: {
          id: true,
          username: true,
          role: true,
          status: true,
          created_at: true,
          updated_at: true,
          _count: {
            select: { network: true },
          },
        },
        orderBy: {
          id: "asc",
        },
        skip: pageNumber > 1 ? (pageNumber - 1) * perPageNumber : 0,
        take: perPageNumber,
      }),
    ]);

    console.log(data);

    const response = {
      data: data[1],
      /**
      pageNumber: 1,
        perPageNumber: 2,
        total: 5,

        1: 1 - 2 (5 >= (1 - 1) * 2 + 2) = (5 >= 0 + 2) = (5 > 2) = (true)
        2: 3 - 4 (5 >= (2 - 1) * 2 + 2) = (5 >= 2 + 2) = (5 > 4) = (true) 
        3: 5 - 6 (5 >= (3 - 1) * 2 + 1) = (5 >= 4 + 1) = (5 > 5) = (false)
            TOTAL = 6
            3: 5 - 6 (6 >= (3 - 1) * 2 + 2) = (6 >= 4 + 2) = (6 > 6) = (false)
       */
      hasNext: data[0] > (pageNumber - 1) * perPageNumber + data[1].length,
      page: pageNumber,
      perPage: perPageNumber,
      total: data[0],
    };

    return res.status(200).send(response);
  } catch (err: Error | any) {
    console.error(err);
    return res.status(400).send({ error: "Invalid request" });
  }
}
