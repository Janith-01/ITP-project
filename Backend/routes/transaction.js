import express from 'express';
import {
  getExtraExpense,
  getExtraExpensebyID,
  addExtraExpense,
  updateExtraExpense,
  deleteExtraExpense
} from '../controllers/ExtraExpense.js';
import ExtraExpense from '../models/ExtraExpenseModel.js';
import Salary from '../models/salesModel.js';

const router = express.Router();

router.get('/get-extraexpenses', getExtraExpense); // getallExtraExpenses
router.get('/get-extraexpense/:id', getExtraExpensebyID); // getExtraExpensebyID
router.post('/add-extraexpense', addExtraExpense); // addExtraExpense
router.put('/update-extraexpense/:id', updateExtraExpense); // updateExtraExpensebyID
router.delete('/delete-extraexpense/:id', deleteExtraExpense); // deleteExtraExpensebyID

router.get('/balance', async (req, res) => {
  try {
    
      const totalIncomeResult = await Salary.aggregate([
          {
              $group: {
                  _id: null,
                  totalIncome: { $sum: '$Total' }
              }
          }
      ]);
      const totalIncome = totalIncomeResult.length > 0 ? totalIncomeResult[0].totalIncome : 0;

      const totalExpenseResult = await ExtraExpense.aggregate([
          {
              $group: {
                  _id: null,
                  totalExpense: { $sum: '$amount' }
              }
          }
      ]);
      const totalExpense = totalExpenseResult.length > 0 ? totalExpenseResult[0].totalExpense : 0;

      
      const profit = totalIncome - totalExpense;
      res.status(200).json({ profit });
  } catch (error) {
      console.error('Error calculating balance:', error.message);
      res.status(500).json({ message: 'Internal server error' });
  }
});


export default router;