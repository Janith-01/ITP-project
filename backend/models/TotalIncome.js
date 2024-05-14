import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const totalIncomeSchema = new Schema({
  totalIncome: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TotalIncome = model("TotalIncome", totalIncomeSchema);

export default TotalIncome;
