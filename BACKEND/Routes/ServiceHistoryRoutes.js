const express = require("express");
const router2 = express.Router();
//Insert Model
const ServiceHistory = require("../Model/ServiceHistoryModel");
//Insert Vehicle Controller
const ServiceHistoryController = require("../Controllers/ServiceHistoryControllers");
//const { default: CostByMonth } = require("../../frontend/src/Components/MonthlyCost/CostByMonth");

router2.get("/",ServiceHistoryController.getAllServicesHistory);
router2.post("/",ServiceHistoryController.addServicesHistory);
router2.get("/:id",ServiceHistoryController.getById);
router2.put("/:id",ServiceHistoryController.updateServiceHistory);
router2.delete("/:id",ServiceHistoryController.deleteServiceHistory);
//router2.get("/",ServiceHistoryController.getTotalCostByMonth);

//export
module.exports = router2;