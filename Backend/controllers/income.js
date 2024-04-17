const Income = require('../models/IncomeModel');

//CRUD operations for Income

// Add income
exports.addincome = async (req, res) => {
    const { transactionId, amount, description, date, category } = req.body;
    const income = new Income({
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
        
        await income.save();
        res.status(201).json({ message: 'Income added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all incomes
exports.getincomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};  

// Get income by ID
exports.getincomebyID = async (req, res) => {
    const { id } = req.params;
    try {
        //validation
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const income = await Income.findById(id);
        console.log(income);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json(income);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}; 

// Delete income by ID
exports.deleteincome = async (req, res) => {
    const { id } = req.params;
    try {
        //validation
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const income = await Income.findByIdAndDelete(id);
        console.log(income);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update income by ID
exports.updateincome = async (req, res) => {
    const { id } = req.params;
    const { transactionId, amount, description, date, category } = req.body;
    try {
        // Validations similar to addincome function
        const income = await Income.findByIdAndUpdate(id, { transactionId, amount, description, date, category }, { new: true });
        console.log(income);
        if (!income) {
            return res.status(404).json({ message: 'Income not found' });
        }
        res.status(200).json({ message: 'Income updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
