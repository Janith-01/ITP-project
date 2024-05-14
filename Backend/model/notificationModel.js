// notificationModel.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(), // Fix to ensure the current date is used
  },
});


export default mongoose.model("Notification", notificationSchema);