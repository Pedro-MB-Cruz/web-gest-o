import { Response, Router } from "express";
import authRouter from "./authentication.route";
import userRouter from "./user.route";
import networkRouter from "./networks.route";
import authenticationMiddleware from "@/middleware/authentication.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/network", networkRouter);

export default router;
