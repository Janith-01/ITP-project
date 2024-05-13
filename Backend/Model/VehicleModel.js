/*const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    vin:{
        type:String, //dataType
        required:true, //validate
    },
    regNo:{
        type:String, //dataType
        required:true, //validate
    },
    make:{
        type:String, //dataType
        required:true, //validate
    },
    model:{
        type:String, //dataType
        required:true, //validate
    },
    year:{
        type:Number, //dataType
        required:true, //validate
    },
    ownerName:{
        type:String, //dataType
        required:true, //validate
    },
    ownerNic:{
        type:Number, //dataType
        required:true, //validate
    },
    ownerEmail:{
        type:String, //dataType
        required:true, //validate
    },
    ownerAddress:{
        type:String, //dataType
        required:true, //validate
    },
    contactNo:{
        type:Number, //dataType
        required:true, //validate
    }
});

module.exports = mongoose.model(
    "VehicleModel", //file name
    vehicleSchema //function name
)*/


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
