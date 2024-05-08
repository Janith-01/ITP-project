// saleModel.js

import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    productId: {
        type: String,
        required:true
    },

    productName:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true,
    },

    quantitySold: {
        type: Number,
        required: true
    },

    unitPrice:{
        type:Number,
        required:true

    },

    dateSold: {
        type: Date,
        required:true,
    }
});

export default mongoose.model("Sale", saleSchema);
