import mongoose from "mongoose";

const reqOrderSchema = new mongoose.Schema({
    Request_ID: {
        type: String,
        required: true // validate
    },
    Product_ID: {
        type: String,
        required: true // validate
    },
    Product_Name: {
        type: String,
        required: true // validate
    },
    Quantity: {
        type: Number,
        required: true // validate
    },
    Requested_Date: {
        type: Date,
        required: true // validate
    },
    Status: {
        type: String,
        required: true // validate
    }
});

// Corrected model name and export
const ReqOrder = mongoose.model('ReqOrder', reqOrderSchema);
export default ReqOrder;
