import mongoose from "mongoose";
import { DB_URL, NODE_ENV } from "../config/env.js";

if (!DB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env<development/production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`DB Connected at ${NODE_ENV} node`);
  } catch (error) {
    console.error("Error connecting to database: ", error);
    process.exit(1);
  }
};

export default connectToDatabase;
