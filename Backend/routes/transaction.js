const { getexpense, getexpensebyID, updateexpense, deleteexpense, addExpense } = require('../controllers/Expense');
const { addincome, getincomes, deleteincome, getincomebyID, updateincome } = require('../controllers/income');
const { getExtraExpense, getExtraExpensebyID, addExtraExpense,updateExtraExpense,deleteExtraExpense } = require('../controllers/ExtraExpense');
const router = require('express').Router();

router.post('/add-income', addincome);//addincome
router.get('/get-incomes', getincomes);//getallIncomes
router.get('/get-income/:id', getincomebyID);//getIncomebyID
router.delete('/delete-income/:id', deleteincome);//deleteIncomebyID
router.put('/update-income/:id', updateincome);//updateIncomebyID

router.get('/get-expenses', getexpense);//getallExpenses
router.get('/get-expense/:id', getexpensebyID);//getExpensebyID
router.post('/add-expense', addExpense);//addExpense
router.put('/update-expense/:id', updateexpense);//updateExpensebyID
router.delete('/delete-expense/:id', deleteexpense);//deleteExpensebyID

router.get('/get-extraexpenses', getExtraExpense);//getallExtraExpenses
router.get('/get-extraexpense/:id', getExtraExpensebyID);//getExtraExpensebyID
router.post('/add-extraexpense', addExtraExpense);//addExtraExpense
router.put('/update-extraexpense/:id', updateExtraExpense);//updateExtraExpensebyID
router.delete('/delete-extraexpense/:id', deleteExtraExpense);//deleteExtraExpensebyID

module.exports = router;
