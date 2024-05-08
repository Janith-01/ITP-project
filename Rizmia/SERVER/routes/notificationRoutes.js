// notificationRoutes.js

import express from "express";
import { getAllNotifications } from "../controller/notificationController.js";

const router = express.Router();

router.get("/display", getAllNotifications);

export default router;