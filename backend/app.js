//v84btEcWAc9HVwXV
const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/AppointmentRoutes");

// Import appointment routes

const app = express();
const cors= require("cors");    

// Middleware
app.use(express.json());
app.use(cors());
app.use("/users",router);



// Routes

 
// MongoDB connection
mongoose.connect("mongodb+srv://Thihini:1234t@mernprofile.zxpksvj.mongodb.net/garagedb?retryWrites=true&w=majority&appName=MernProfile")
.then(() => console.log("Connected to MongoDB"))

.then(() => {

    app.listen(5000); 
        
})

.catch((err) => console.log((err)));