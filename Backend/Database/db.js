/*const express = require("express");
const mongoose = require("mongoose");

const app = express();

//MIddleware
app.use("/", (req, res, next) => {
    res.send("It Is Working...!");
}) 

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:2VTPq0EoXgEmJadp@cluster0.ww9dafb.mongodb.net/");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};*/



import express from "express";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use("/", (req, res, next) => {
    res.send("It Is Working...!");
}); 

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:2VTPq0EoXgEmJadp@cluster0.ww9dafb.mongodb.net/");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Call connectDB function
connectDB();

export default app;

