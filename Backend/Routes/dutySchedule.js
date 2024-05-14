import express from "express";
const router = express.Router();
import * as dutyScheduleController from "../Controllers/dutyScheduleController.js";

// Routes for Duty Schedule
router.post("/", dutyScheduleController.createDutySchedule);
router.get("/", dutyScheduleController.getAllDutySchedules);
router.get("/:id", dutyScheduleController.getDutyScheduleById);
router.put("/:id", dutyScheduleController.updateDutySchedule);
router.delete("/:id", dutyScheduleController.deleteDutySchedule);

export default router; 