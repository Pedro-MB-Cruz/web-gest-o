import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
} from "@/controllers/authentication";
import noAuthenticationMiddleware from "@/middleware/no_authentication.middleware";
import authenticationMiddleware from "@/middleware/authentication.middleware";

const router = Router();

router.post("/signup", noAuthenticationMiddleware, register);
router.post("/signin", noAuthenticationMiddleware, login);
router.post("/forgot-password", noAuthenticationMiddleware, forgotPassword);
router.post("/signout", authenticationMiddleware, logout);

export default router;
