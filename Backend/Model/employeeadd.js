import mongoose from "mongoose";

const { Schema, model } = mongoose;

const empSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    Eid: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Ps: {
        type: String,
        required: true,
    }
});

export default model("employeeadd", empSchema);