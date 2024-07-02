import express from 'express';
import {
  getExtraExpense,
  getExtraExpensebyID,
  addExtraExpense,
  updateExtraExpense,
  deleteExtraExpense
} from '../controllers/ExtraExpense.js';

const router5 = express.Router();

router5.get('/get-extraexpenses', getExtraExpense); // getallExtraExpenses
router5.get('/get-extraexpense/:id', getExtraExpensebyID); // getExtraExpensebyID
router5.post('/add-extraexpense', addExtraExpense); // addExtraExpense
router5.put('/update-extraexpense/:id', updateExtraExpense); // updateExtraExpensebyID
router5.delete('/delete-extraexpense/:id', deleteExtraExpense); // deleteExtraExpensebyID

export default router5;