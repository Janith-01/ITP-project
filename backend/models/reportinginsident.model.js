import mongoose from "mongoose";

const reportinginsidentSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    vehicleNumber: {
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
    }
},
    {
        timestamps: true
    }
);

const Reportinginsident = mongoose.model('Reportinginsident', reportinginsidentSchema);
export default Reportinginsident;
