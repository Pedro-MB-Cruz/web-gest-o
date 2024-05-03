import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res
    .send({
      message: "Hello World!",
    })
    .json();
});

export default router;
