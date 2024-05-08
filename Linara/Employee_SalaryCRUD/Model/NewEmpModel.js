import mongoose from "mongoose";

const { Schema, model } = mongoose;

const NewEmpSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
    },
    jobRole: {
        type: String,
        required: true,
    },
    Eid: {
        type: String,
        required: true,
    },
});

export default model("NewEmployee", NewEmpSchema);