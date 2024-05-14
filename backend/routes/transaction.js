import express from 'express';
import {
  getExtraExpense,
  getExtraExpensebyID,
  addExtraExpense,
  updateExtraExpense,
  deleteExtraExpense
} from '../controllers/ExtraExpense.js';

const router = express.Router();

router.get('/get-extraexpenses', getExtraExpense); // getallExtraExpenses
router.get('/get-extraexpense/:id', getExtraExpensebyID); // getExtraExpensebyID
router.post('/add-extraexpense', addExtraExpense); // addExtraExpense
router.put('/update-extraexpense/:id', updateExtraExpense); // updateExtraExpensebyID
router.delete('/delete-extraexpense/:id', deleteExtraExpense); // deleteExtraExpensebyID

export default router;