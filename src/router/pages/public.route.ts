import express, { Request, Response, Router } from "express";

const router = Router();

// router.get("/", (req: Request, res: Response) => {
//   res.send("Isto vai ser uma página");
// });

// TODO: TEMPORARY (CHANGE THIS)
// router.get("/", express.static("pages/index.html"));
router.get("/", (req, res) => {
  res.sendFile("pages/index.html", {
    root: ".",
  });
});
router.get("/signup", (req, res) => {
  res.sendFile("pages/signup.html", {
    root: ".",
  });
});
router.get("/signin", (req, res) => {
  res.sendFile("pages/login.html", {
    root: ".",
  });
});
router.get("/forgot-password", (req, res) => {
  res.sendFile("pages/recuperarpass.html", {
    root: ".",
  });
});

export default router;
