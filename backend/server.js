import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database/connection.js";
import dotenv from "dotenv";
import router from "./router/route.js";
import userRouter from "./router/userRoutes.js";
import feedbackRouter from "./router/feedbackRoutes.js";
import reportRouter from "./router/reportRoutes.js";

// environment variables
dotenv.config();

// connect database
connectDB();

// Express App
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powerd-by");

const port = process.env.PORT || 8080;
app.get("/", (req, res) => {
  res.status(201).json("Home Get Request");
});

/** Define Routes**/
// standard info routes
app.use("/api", router);
// User routes
app.use("/api/user", userRouter);

// Feedback routes
app.use("/api/job", feedbackRouter);

// Report routes
app.use("/api/report", reportRouter);

// Start Server

app.listen(port, () => {
  console.log(`Server connected to Port - http://localhost:${port}`);
});
