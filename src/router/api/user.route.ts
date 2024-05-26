import { Router } from "express";
import { deleteUser, me, updateUser } from "@/controllers/user";
import authenticationMiddleware from "@/middleware/authentication.middleware";

const router = Router();

router.get("/", authenticationMiddleware, me);
router.put("/", authenticationMiddleware, updateUser);
router.delete("/", authenticationMiddleware, deleteUser);

export default router;
