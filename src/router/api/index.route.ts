import { Router } from "express";
import authRouter from "./authentication.route";
import userRouter from "./user.route";
import networkRouter from "./networks.route";
import adminRouter from "./admin.route";
import subNetworkRouter from "./subnetwork.route";
import devicesRouter from "./device.route";
import authenticationMiddleware from "@/middleware/authentication.middleware";
import adminOnlyMiddleware from "@/middleware/adminOnly.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/network", networkRouter);
router.use("/subnetwork", subNetworkRouter);
router.use("/devices", devicesRouter);
router.use(
  "/admin",
  authenticationMiddleware,
  adminOnlyMiddleware,
  adminRouter
);

export default router;
