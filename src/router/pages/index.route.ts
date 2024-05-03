import { Request, Response, Router } from "express";
import publicRoute from "./public.route";
import protectedRoute from "./protected.route";

const router = Router();

router.use("/", publicRoute);
router.use("/p", protectedRoute);

export default router;
