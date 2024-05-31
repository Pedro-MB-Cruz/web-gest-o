import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile("pages/admin/index.html", {
    root: ".",
  });
});

export default router;
