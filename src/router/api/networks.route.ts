import { Router } from "express";
import authenticationMiddleware from "@/middleware/authentication.middleware";
import {
  getUserNetworks,
  getNetworkById,
  createNetwork,
  updateNetwork,
  deleteNetwork,
} from "@/controllers/network";
import technicianOnlyMiddleware from "@/middleware/technicianOnly.middleware";

const router = Router();

// Get all user's network networks
router.get("/", authenticationMiddleware, getUserNetworks);
// Get a network by id
router.get("/:id", getNetworkById);
// Create a network (only for technicians or above)
router.post(
  "/",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  createNetwork
);
// Update a network (only for the owner or above)
router.put(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  updateNetwork
);
// Delete a network (only for the owner or above)
router.delete(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  deleteNetwork
);

export default router;
