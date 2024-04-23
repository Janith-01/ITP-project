import express from "express";
import mongoose from "mongoose";
import insidentRoutes from "./routes/insident.route.js";
import ReportinginsidentRoutes from "./routes/reportinginsident.route.js"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

//loading mongo db connection string that stored in .env file
let MONGO_URL = process.env.MONGO_DB_URL;
mongoose.connect(MONGO_URL)
    .then(() => {
        //to check weather the database is connected successfully
        console.log("💻 connected to MongoDB 🚀");
    })
    .catch((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

//backend is running on port 3000
app.listen(3000, () => {
    console.log("Server is listening on PORT  http://localhost:3000");
})

app.use('/api/insident', insidentRoutes);
app.use('/api/reportinginsident',ReportinginsidentRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})
