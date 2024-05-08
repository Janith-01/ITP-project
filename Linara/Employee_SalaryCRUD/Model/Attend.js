import mongoose from "mongoose";

const { Schema, model } = mongoose;

const AttendSchema = new Schema ({
    Eid: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
    Stime: {
        type: String,
        required: true,
    },
    Etime: {
        type: String,
        required: true,
    },
});

export default model("Attend", AttendSchema);