//pw = 2VTPq0EoXgEmJadp

/*const express = require("express");
const mongoose = require("mongoose");
const router = require("./Routes/VehicleRoutes");
const router2 = require("./Routes/ServiceHistoryRoutes");


const app = express();
const cors = require("cors");

//MIddleware
app.use(express.json());
app.use(cors());

app.use("/vehicles",router);
app.use("/serviceshistory", router2);


mongoose.connect("mongodb+srv://admin:2VTPq0EoXgEmJadp@cluster0.ww9dafb.mongodb.net/")
  .then(() => console.log("Connected to MongoDB!"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });*/


  import express from "express";
import mongoose from "mongoose";
import vehicleRouter from "./Routes/VehicleRoutes.js";
import serviceHistoryRouter from "./Routes/ServiceHistoryRoutes.js";

const app = express();
import cors from "cors";

// Middleware
app.use(express.json());
app.use(cors());

app.use("/vehicles", vehicleRouter);
app.use("/serviceshistory", serviceHistoryRouter);

mongoose
  .connect("mongodb+srv://admin:2VTPq0EoXgEmJadp@cluster0.ww9dafb.mongodb.net/")
  .then(() => console.log("Connected to MongoDB!"))
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });


  
