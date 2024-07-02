

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const vehicleSchema = new Schema({
    vin: {
        type: String,
        required: true,
    },
    regNo: {
        type: String,
        required: true,
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    ownerNic: {
        type: Number,
        required: true,
    },
    ownerEmail: {
        type: String,
        required: true,
    },
    ownerAddress: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    }
});

const VehicleModel = model(
    "VehicleModel", // collection name
    vehicleSchema // schema to be used
);

export default VehicleModel;
