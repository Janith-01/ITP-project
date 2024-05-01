const mongoose = require("mongoose");
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
)