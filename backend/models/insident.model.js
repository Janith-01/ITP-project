import mongoose from "mongoose";

const insidentSchema = new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    vehicleType: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true,
        unique: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    insidentType: {
        type: String,
        required: true
    },
    damageType: {  //severe, intermediate
        type: String,
        required: true
    },
    insurencePolicy: { 
        type: String,
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
