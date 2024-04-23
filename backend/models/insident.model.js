import mongoose from "mongoose";

const insidentSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    emergencyType: {
        type: String,
        required: true
    },
    damageType: {  //severe, intermediate
        type: String,
        required: true
    },
    status: { 
        type: String,
        required: true
    },
    estimatedCost: {
        type: Number,
        required: true
    },
},
    {
        timestamps: true
    }
);

const Insident = mongoose.model('Insident', insidentSchema);
export default Insident;
