import express from "express";
import morgan from "morgan";
import connectDB from "./database/connection.js";
import dotenv from "dotenv";
import userRouter from "./router/userRoutes.js";
import feedbackRouter from "./router/feedbackRoutes.js";
import reqOrderRoutes from "./router/reqOrderRoutes.js";
import supRoutes from "./router/supRoutes.js";
import cors from 'cors';

// Environment variables
dotenv.config();

// Connect to the database
connectDB();

// Express App
const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());
app.use(morgan("tiny"));

// Routes
app.use("/api/user", userRouter); // User routes
app.use("/api/job", feedbackRouter); // Feedback routes
app.use("/", reqOrderRoutes); // Request order routes
app.use("/", supRoutes); // Supplier routes

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API!" });
});

// Start Server
const port = process.env.PORT || 8083;
app.listen(port, () => {
  console.log(`Server connected to Port - http://localhost:${port}`);
});
