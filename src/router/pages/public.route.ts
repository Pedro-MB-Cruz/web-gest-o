import noAuthenticationMiddleware from "@/middleware/no_authentication.middleware";
import { Router } from "express";

const router = Router();

// router.get("/", (req: Request, res: Response) => {
//   res.send("Isto vai ser uma página");
// });

// TODO: TEMPORARY (CHANGE THIS)
// router.get("/", express.static("pages/index.html"));
router.get("/test", (req, res) => {
  res.sendFile("pages/f.html", {
    root: ".",
  });
});
router.get("/", (req, res) => {
  res.sendFile("pages/index.html", {
    root: ".",
  });
});
router.get("/signup", noAuthenticationMiddleware, (req, res) => {
  res.sendFile("pages/signup.html", {
    root: ".",
  });
});
router.get("/signin", noAuthenticationMiddleware, (req, res) => {
  res.sendFile("pages/login.html", {
    root: ".",
  });
});
router.get("/forgot-password", noAuthenticationMiddleware, (req, res) => {
  res.sendFile("pages/recuperarpass.html", {
    root: ".",
  });
});
router.get("/about", (req, res) => {
  res.sendFile("pages/about.html", {
    root: ".",
  });
});

export default router;
