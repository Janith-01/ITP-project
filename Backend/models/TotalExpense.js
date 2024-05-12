import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const totalExpenseSchema = new Schema({
    totalExpense: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

const TotalExpense = model("TotalExpense", totalExpenseSchema);

export default TotalExpense;