const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({

    transactionId: {
        type: String,
        required: true,
        unique: true
    },

    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        trim: true,
        maxLength: 40,
        required: true
    },
    type : {
        type: String,
        default: 'Expense',
        required: true
    },
    date: {
        type: Date,
        trim: true, 
        required: true
    },
    category: {
        type: String,
        maxLength: 40,
        trim: true,
        required: true
    },

}, {timestamps: true})


module.exports = mongoose.model('Expense', ExpenseSchema)