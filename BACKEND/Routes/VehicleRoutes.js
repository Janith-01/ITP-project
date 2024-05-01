const express = require("express");
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
module.exports = router;