import mongoose, { Mongoose } from "mongoose";

export const FeedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
  },
  feedback: {
    type: String,
  },
  rating: {
    type: Number,
  },
  jobId: {
    type: Number,
  },

  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model("Feedback", FeedbackSchema);
