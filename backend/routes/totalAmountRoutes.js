import express from 'express';
import TotalIncomeController from '../controllers/TotalIncomeController.js'; 

const router3 = express.Router();

router3.post('/totalIncome', TotalIncomeController.saveTotalIncome);
router3.get('/api/totalIncome', TotalIncomeController.getTotalIncome); 

export default router3;
