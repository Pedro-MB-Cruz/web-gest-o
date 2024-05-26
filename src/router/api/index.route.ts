import { Request, Response, Router } from "express";
import authRouter from "./authentication.route";
import networkRouter from "./networks.route";
import authenticationMiddleware from "@/middleware/authentication.middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/network", networkRouter);

router.get(
  "/me",
  authenticationMiddleware,
  (req: RequestWithAuth, res: Response) => {
    return res.status(200).json({
      message: "Hello, " + req.body.userData.username,
      data: req.body.userData,
    });
  }
);

export default router;
