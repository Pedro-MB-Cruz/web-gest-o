import { Request, Response, Router } from "express";
import authRouter from "./authentication.route";

const router = Router();

router.use("/auth", authRouter);

export default router;
