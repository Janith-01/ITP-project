import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of email addresses
    },
    supplyingGoods: {
        type: String,
        
    }
});

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;
