import mongoose from 'mongoose';

const ExtraExpenseSchema = new mongoose.Schema({
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
    type: {
        type: String,
        default: 'Expense',
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
    }
}, { timestamps: true });

const ExtraExpense = mongoose.model('ExtraExpense', ExtraExpenseSchema);

export default ExtraExpense;