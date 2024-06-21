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
// Get a subNetworks by id
router.get("/:id", getSubNetworkById);
// Create a subNetwork (only for technicians or above)
router.post(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  createSubNetwork
);
// Update a subNetwork (only for the owner or above)
router.put(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  updateSubNetwork
);
// Delete a subNetwork (only for the owner or above)
router.delete(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  deleteSubNetwork
);

export default router;
