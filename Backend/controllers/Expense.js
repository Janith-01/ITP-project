const Expense = require('../models/ExpensesModel');

//CRUD operations for Expense

// Add Expense
exports.addExpense = async (req, res) => {
    const { transactionId, amount, description, date, category } = req.body;
    const expense = new Expense({
        transactionId,
        amount,
        description,
        date,
        category 
    });

    try {
        // Validations
        if (!transactionId || !description || !date || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'Amount should be a number and greater than 0' });
        }
        
        await expense.save();
        res.status(201).json({ message: 'Expense added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all expenses
exports.getexpense = async (req, res) => {
    try {
        const expense = await Expense.find().sort({ createdAt: -1 });
        res.status(200).json(expense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};  

// Get expense by ID
exports.getexpensebyID = async (req, res) => {
    const { id } = req.params;
    try {
        //validation
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const expense = await Expense.findById(id);
        console.log(expense);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(expense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 

// Delete expense by ID
exports.deleteexpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findByIdAndDelete(id);
        console.log(expense);
        //validations
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update expense by ID
exports.updateexpense = async (req, res) => {
    const { id } = req.params;
    const { transactionId, amount, description, date, category } = req.body;
    try {
        // Validations similar to addExpense
        const expense = await Expense.findByIdAndUpdate(id, { transactionId, amount, description, date, category }, { new: true });
        console.log(expense);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
