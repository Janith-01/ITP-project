import express from "express";
const router2 = express.Router();

//Insert Vehicle Controller
import * as ServiceHistoryController from "../controllers/ServiceHistoryControllers.js";

router2.get("/getallVhistory", ServiceHistoryController.getAllServicesHistory);
router2.post("/addvehicle", ServiceHistoryController.addServicesHistory);
router2.get("/getvehicle:id", ServiceHistoryController.getById);
router2.put("/updatevehicle:id", ServiceHistoryController.updateServiceHistory);
router2.delete("/deletevehicle:id", ServiceHistoryController.deleteServiceHistory);
router2.get("/income-data", ServiceHistoryController.getIncomeData);

// Export
export default router2;
