import mongoose, { Mongoose } from "mongoose";

export const CompanySchema = new mongoose.Schema({
  companyId: {
    type: Number,
  },
  companyName: {
    type: String,
  },
  feedbackCount: {
    type: Number,
  },
  totalRatings: {
    type: Number,
  },
  rating: {
    type: Number,
  },
});

export default mongoose.model("Company", CompanySchema);
