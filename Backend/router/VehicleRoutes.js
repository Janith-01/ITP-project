/*const express = require("express");
const router = express.Router();
//Insert Model
const Vehicle = require("../Model/VehicleModel");
//Insert Vehicle Controller
const VehicleController = require("../Controllers/VehicleControllers");

router.get("/",VehicleController.getAllVehicles);
router.post("/",VehicleController.addVehicles);
router.get("/:id",VehicleController.getById);
router.put("/:id",VehicleController.updateVehicle);
router.delete("/:id",VehicleController.deleteVehicle);

//export
module.exports = router;*/



import express from "express";
const router = express.Router();
// Insert Model
import Vehicle from "../Model/VehicleModel.js";
// Insert Vehicle Controller
import  { getAllVehicles, addVehicles, getById, updateVehicle, deleteVehicle }from "../controllers/VehicleControllers.js";

router.get("/", getAllVehicles);
router.post("/", addVehicles);
router.get("/:id", getById);
router.put("/:id",updateVehicle);
router.delete("/:id", deleteVehicle);

// export
export default router;
