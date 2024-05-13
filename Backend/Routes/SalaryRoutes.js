import express from "express";
const router = express.Router();
import * as salaryController from "../Controllers/SalaryControllers.js";

// Define routes for Salary API

// POST request to add salary details
router.post("/", salaryController.addSalary);

// GET request to fetch all salary details
router.get("/", salaryController.getAllSalary);

// GET request to fetch a salary entry by ID
router.get("/:id", salaryController.getSalaryById);
router.put("/:id", salaryController.updateSalary);

// DELETE request to delete a salary entry by ID
router.delete("/:id", salaryController.deleteSalary);

export default router;