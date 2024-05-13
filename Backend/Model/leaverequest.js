import mongoose from "mongoose";

const { Schema, model } = mongoose;

const leaveSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    Eid: {
        type: String,
        required: true,
    },
    lType: {
        type: String,
        required: true,
    },
    sdate: {
        type: String,
        required: true,
    },
    edate: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});

export default model("leaveRequest", leaveSchema);