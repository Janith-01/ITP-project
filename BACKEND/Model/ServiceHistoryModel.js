const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicehistorySchema = new Schema({
    vin:{
        type:String, 
        required:true, 
    },
    type:{
        type:String, 
        required:true, 
    },
    date:{
        type:Date, 
        required:true, 
    },
    description:{
        type:String, 
        required:true, 
    },
    parts:{
        type:String, 
        required:true, 
    },
    cost:{
        type:Number, ////
        required:true, 
    },
    macanic:{
        type:String, 
        required:true, 
    }
       
});

module.exports = mongoose.model(
    "ServiceHistoryModel", //file name
    servicehistorySchema //function name
)