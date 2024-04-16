const mongoose = require('mongoose');

const Scehema = mongoose.Schema;

const userScehma = new Scehema({
    name:{
        type : String,
        required : true //backend validation

    },
    email:{
        type : String,
        required : true
    },

    address:{
        type : String,
        required: true
    },

    phoneNumber:{
        type: String,
        required: true
    },

    gender:{
        type: String,
        required: false
    },

    userType:{
        type:String,
        required: true
        
    },

})

const User = mongoose.model("User" , userScehma);
module.exports = User;
