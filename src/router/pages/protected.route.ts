import { Router } from "express";

const router = Router();

router.get("/admin", (req, res) => {
  res.sendFile("pages/firstpageadmin.html", {
    root: ".",
  });
});
export default router;
