import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connecting to MongoDB is done");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

export default connectDB;
