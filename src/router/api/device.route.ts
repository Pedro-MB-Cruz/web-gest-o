import { Router } from "express";
import authenticationMiddleware from "@/middleware/authentication.middleware";
import {
  createDevice,
  getDeviceById,
  updateDevice,
  deleteDevice,
} from "@/controllers/devices";
import technicianOnlyMiddleware from "@/middleware/technicianOnly.middleware";

const router = Router();

// Get a device by id
router.get("/:id", getDeviceById);
// Create a device (only for technicians or above)
router.post(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  createDevice
);
// Update a network (only for the owner or above)
router.put(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  updateDevice
);
// Delete a network (only for the owner or above)
router.delete(
  "/:id",
  authenticationMiddleware,
  technicianOnlyMiddleware,
  deleteDevice
);

export default router;
