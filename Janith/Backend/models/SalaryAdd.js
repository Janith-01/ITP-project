import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SalarySchema = new Schema ({
    EmpID: {
        type: String,
        required: true,
    },
    Month: {
        type: String,
        required: true,
    },
    Job_Role: {
        type: String,
        required: true,
    },
    Basic_Salary: {
        type: Number,
        required: true,
    },
    OT_Hours: {
        type: Number,
        required: true,
    },
    OT_Rate: {
        type: Number,
        required: true,
    },
    OT_Total: {
        type: Number,
        required: true,
    },
    Bonus: {
        type: Number,
        required: true,
    },
    Total: {
        type: Number,
        required: true,
    },
});

export default model("SalaryAdd", SalarySchema);