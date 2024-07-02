import express from 'express';
import { getTotalIncome, getTotalExpense } from '../model/financeModel.js';

const router6 = express.Router();

//  calculate total balance
router6.get('/totalBalance', async (req, res) => {
  try {
    const totalIncome = await getTotalIncome();
    console.log('Total Income for balance:', totalIncome);
    const totalExpense = await getTotalExpense();
    console.log('Total Expense for balance:', totalExpense);

    const balance = totalIncome - totalExpense;

    res.json({ totalBalance: balance });
  } catch (error) {
    console.error('Error calculating balance:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router6;
