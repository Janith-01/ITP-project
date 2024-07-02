import ExtraExpense from '../model/ExtraExpenseModel.js';

// Add ExtraExpense
export const addExtraExpense = async (req, res) => {
    const { transactionId, amount, description, date, category } = req.body;
    const extraexpense = new ExtraExpense({
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
        
        await extraexpense.save();
        res.status(201).json({ message: 'Extra Expense added successfully' });
        console.log(extraexpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//get all extra expenses
export const getExtraExpense = async (req, res) => {
    try {
        const extraexpense = await ExtraExpense.find().sort({ createdAt: -1 });
        res.status(200).json(extraexpense);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get extra expense by ID
export const getExtraExpensebyID = async (req, res) => {
    const { id } = req.params;
    try {
        const extraexpense = await ExtraExpense.findById(id);
        console.log(extraexpense);
        if (!extraexpense) {
            return res.status(404).json({ message: 'Extra Expense not found' });
        }
        res.status(200).json(extraexpense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete extra expense by ID
export const deleteExtraExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const extraexpense = await ExtraExpense.findByIdAndDelete(id);
        console.log(extraexpense);
        // Validations
        if (!extraexpense) {
            return res.status(404).json({ message: 'Extra Expense not found' });
        }
        res.status(200).json({ message: 'Extra Expense deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update extra expense by ID
export const updateExtraExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description, date, category } = req.body;
    try {
        const extraexpense = await ExtraExpense.findByIdAndUpdate(
            id,
            { amount, description, date, category },
            { new: true } 
        );
        console.log(extraexpense);
        
        // Validations
        if (!extraexpense) {
            return res.status(404).json({ message: 'Extra Expense not found' });
        }
        res.status(200).json({ message: 'Extra Expense updated successfully', extraexpense });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
