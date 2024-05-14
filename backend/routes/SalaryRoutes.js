import express from "express";
const router = express.Router();
import * as salaryController from "../controllers/SalaryController.js";



// POST request to add salary details
router.post("/addsalary", salaryController.addSalary);

// GET request to fetch all salary details
router.get("/getAllsalary", salaryController.getAllSalary);

// GET request to fetch a salary entry by ID
router.get("/getSalary:id", salaryController.getSalaryById);
router.put("/UpdateSalary:id", salaryController.updateSalary);

// DELETE request to delete a salary entry by ID
router.delete("/DeleteSalary:id", salaryController.deleteSalary);

export default router;