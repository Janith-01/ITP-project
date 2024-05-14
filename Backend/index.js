import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import stockRoutes from "./routes/stockRoute.js";
import reqOrderRoutes from "./routes/reqOrderRoute.js";
import salesRoutes from "./routes/salesRoute.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    })

}).catch(error => console.log(error));

app.use("/api", stockRoutes);
app.use("/notification",notificationRoutes);
app.use("/reqorder", reqOrderRoutes);
app.use("/Sale",salesRoutes)
