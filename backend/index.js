import express from "express";
import mongoose from "mongoose";
import insidentRoutes from "./routes/insident.route.js";

const app = express();

app.listen(3000, () => {
    console.log("Server is listening on PORT  http://localhost:3000");
})

app.use('/api/insident', insidentRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})
