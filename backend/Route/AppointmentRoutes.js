const express = require("express");
const router = express.Router();


// Insert controller
const AppointmentController = require("../Controlers/AppointmentController.js");//C:\Users\DULSARA\Desktop\Project\Backend\Controllers\AppointmnetController.js

router.get("/", AppointmentController.getAllAppointments);
router.post("/appointments", AppointmentController.addAppointment);
router.get("/:id", AppointmentController.getAppointmentById);
router.put("/:id", AppointmentController.updateAppointment);
router.delete("/:id", AppointmentController.deleteAppointment);
module.exports = router;
