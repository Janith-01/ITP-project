import express from "express";
const router = express.Router();
import * as NewEmpControllers from "../Controllers/NewEmpControllers.js";

// Create New Employee
router.post("/", NewEmpControllers.createNewEmployee);

// Get all NewEmp details
router.get("/", NewEmpControllers.getAllNewEmpDetails);

// Get a single employee record by ID
router.get("/:id", NewEmpControllers.getEmployeeById);

// Delete a specific employee
router.delete("/:id", NewEmpControllers.deleteEmployee);

// Authenticate user
// router.post("/authenticate", NewEmpControllers.authenticateUser);

export default router;