import express from 'express';
import { getTotalIncome, getTotalExpense } from '../models/financeModel.js';

const router5 = express.Router();

// Route to calculate total balance
router5.get('/totalBalance', async (req, res) => {
  try {
    // Fetch total income and total expense
    const totalIncome = await getTotalIncome();
    const totalExpense = await getTotalExpense();

    // Calculate balance
    const balance = totalIncome - totalExpense;

    // Send balance as response
    res.json({ totalBalance: balance });
  } catch (error) {
    console.error('Error calculating balance:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router5;
