// notificationRoutes.js

import express from "express";
import { getAllNotifications } from "../controllers/notificationController.js";

const notificationRoutes = express.Router();

notificationRoutes.get("/display", getAllNotifications);

export default notificationRoutes;