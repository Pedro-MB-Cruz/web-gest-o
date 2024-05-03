import express, { Request, Response, Router } from "express";

const router = Router();

// router.get("/", (req: Request, res: Response) => {
//   res.send("Isto vai ser uma página");
// });

// TODO: TEMPORARY (CHANGE THIS)
router.get("/", express.static("pages/index.html"));
router.use("/", express.static("pages"));

export default router;
