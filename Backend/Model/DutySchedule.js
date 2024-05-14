import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const dutySchema = new Schema({
    Eid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    Month: {
        type: String,
        required: true,
    },
    week: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
});

export default model("DutySchedule", dutySchema);