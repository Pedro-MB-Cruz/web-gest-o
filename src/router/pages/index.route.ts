import { NextFunction, Request, Response, Router } from "express";
import publicRoute from "./public.route";
import protectedRoute from "./protected.route";
import authMiddleware from "@/middleware/authentication.middleware";

const router = Router();

router.use("/", publicRoute);
router.use("/p", authMiddleware, protectedRoute);

export default router;
