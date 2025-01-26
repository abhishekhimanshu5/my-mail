import mongoose from 'mongoose';
import dotenv from "dotenv";
// MongoDB connection URI
dotenv.config();
const url = process.env.DB_URL_CLOUD; // Database URL


// Function to connect to MongoDB using Mongoose
export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected using Mongoose');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit the process if unable to connect
    }
};