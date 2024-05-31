import { Router } from "express";
import adminRouter from "./admin/index.route";
import adminOnlyMiddleware from "@/middleware/adminOnly.middleware";

const router = Router();

router.use("/admin", adminOnlyMiddleware, adminRouter);
router.get("/", (req, res) => {
  res.sendFile("pages/firstpage.html", {
    root: ".",
  });
});

export default router;
