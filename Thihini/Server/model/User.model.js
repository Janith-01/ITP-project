import mongoose, { Mongoose } from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Provide valid Email"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Please Provide Valid Password"],
    unique: [false],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  userType: {
    type: String,
    required: [true, "Please Provide Valid User Type"],
    unique: [false],
  },
  isDelete: {
    type: Boolean,
  },
  updateHistory: [
    {
      adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
      changes: { type: Object }, // Store the changes made by the admin
    },
  ],
});

export default mongoose.model.Users || mongoose.model("User", UserSchema);
