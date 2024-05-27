import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.sendFile("pages/firstpage.html", {
    root: ".",
  });
});

export default router;
