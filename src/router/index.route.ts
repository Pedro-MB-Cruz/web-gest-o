import { Router } from "express";
import apiRoute from "./api.route";
import pagesRoute from "./pages/index.route";
import staticRoute from "./static.route";

const router = Router();

router.use("/api", apiRoute);
router.use("/static", staticRoute);
router.use("/", pagesRoute);
router.use("*", (req, res) => {
  res.status(404);
});

export default router;
