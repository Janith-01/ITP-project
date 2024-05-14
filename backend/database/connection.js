import mongoose from "mongoose";

async function connectDB() {
    try {
      console.log(`Mongo DB URL ${process.env.MONGO_URL}`);
    const conn = await mongoose.connect(process.env.MONGO_URL || "");
    console.log(`Mongo DB connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;
