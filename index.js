import dotenv from "dotenv";
import cors from 'cors';
import express from "express";
import userRouter from "./src/routes/userRoutes.js";
import { connectToMongoDB } from "./src/config/database.js";
import emailRouter from "./src/routes/emailRoutes.js";


const server = express();
server.use(cors());

dotenv.config();
server.use(express.json())
server.use('/auth',userRouter)
server.use('/mailbox',emailRouter)

const PORT = process.env.PORT || 1000;
connectToMongoDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server is listening on port : "+PORT);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });