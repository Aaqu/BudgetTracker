import mongoose from "mongoose";

export async function dbConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.info("Database is already connected.");
      return mongoose.connection;
    }

    if (mongoose.connection.readyState === 2) {
      console.info("Database connection is currently in progress.");
      return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not defined.");
    }

    const connection = await mongoose.connect(String(process.env.MONGODB_URI));
    console.info("Database connection established successfully.");
    return connection;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database connection error:", error.message);
      throw error;
    } else {
      throw new Error("Unknown database connection error.");
    }
  }
}
