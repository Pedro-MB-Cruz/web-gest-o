import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "@/controllers/admin";
import authenticationMiddleware from "@/middleware/authentication.middleware";
import adminOnlyMiddleware from "@/middleware/adminOnly.middleware";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
