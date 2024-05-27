import { Router } from "express";
import authenticationMiddleware from "@/middleware/authentication.middleware";
import {
  createSubNetwork,
  getSubNetworkById,
  updateSubNetwork,
  deleteSubNetwork,
} from "@/controllers/subnetwork";
import technicianOnlyMiddleware from "@/middleware/technicianOnly.middleware";

const router = Router();

// Get a subnetworks by id
router.get("/:id", getSubNetworkById);
// Create a network (only for technicians or above)
router.post(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  createSubNetwork
);
// Update a network (only for the owner or above)
router.put(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  updateSubNetwork
);
// Delete a network (only for the owner or above)
router.delete(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  deleteSubNetwork
);

export default router;
