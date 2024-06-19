import { Router } from "express";

const router = Router();

router.get("/", (req,res)=>{
  res.sendFile("pages/firstpage.html",{
    root:".",
  });
});

router.get("/admin", (req, res) => {
  res.sendFile("pages/firstpageadmin.html", {
    root: ".",
  });
});
export default router;
