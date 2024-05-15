/*import express from "express";
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
  });*/




  import express from "express";
import mongoose from "mongoose";
import vehicleRouter from "./Routes/VehicleRoutes.js";
import serviceHistoryRouter from "./Routes/ServiceHistoryRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/vehicles", vehicleRouter);
app.use("/serviceshistory", serviceHistoryRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });



  
