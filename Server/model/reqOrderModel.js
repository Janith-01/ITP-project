import mongoose from "mongoose";

const reqOrderSchema = new mongoose.Schema({
    Request_ID: {
        type: String,
        required: true
    },
    Product_ID: {
        type: String,
        required: true
    },
    Product_Name: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    Requested_Date: {
        type: Date,
        required: true
    },
    Status: {
        type: String,
        required: true
    }
});

const ReqOrder = mongoose.model('ReqOrder', reqOrderSchema);
export default ReqOrder;
