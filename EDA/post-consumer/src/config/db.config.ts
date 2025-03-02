import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/eda")
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Error connecting to MongoDB", err));
}