
import mongoose from "mongoose";

const  stockSchema = new mongoose.Schema({
    productId:{
        type: String,
        required:true
    },

    productName:{
        type: String,
        required:true
    },

    category:{
        type: String,
        required: true
    },

    quantity:{
        type: Number,
        required:true
    },

    unitPrice:{
        type: Number,
        required:true
    },

    status: {
        type: String,
        enum: ["in stock", "out of stock"],
        default: "in stock"
    }
})

export default mongoose.model("Stock" , stockSchema);