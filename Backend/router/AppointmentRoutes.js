import express from "express";
import { 
    getAllAppointments,
    addAppointment,
    getAppointmentById,
    updateAppointment,
    deleteAppointment
} from "../controllers/AppointmentController.js";

const router = express.Router();

router.get("/", getAllAppointments);
router.post("/appointments", addAppointment);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

export default router;
