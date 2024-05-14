import express from "express";
const router = express.Router();
import * as employeeController from "../Controllers/EmployeeControllers.js";

// Routes for Employee
router.post("/", employeeController.createEmployee);
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

export default router;