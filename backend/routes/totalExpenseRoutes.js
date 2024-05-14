import express from 'express';
import TotalExpenseController from '../controllers/TotalExpenseController.js';

const router4 = express.Router();

router4.get('/api/totalExpense', TotalExpenseController.getTotalExpense);

export default router4;
