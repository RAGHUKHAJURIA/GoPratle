import mongoose from "mongoose";

const isDev = process.env.NODE_ENV !== "production";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectDB = async (): Promise<void> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is not defined in environment variables");
    return;
  }

  try {
    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGO_URI, {
        autoIndex: isDev,
      }).then((m) => {
        console.log(`MongoDB Connected`);
        return m;
      });
    }
    cached.conn = await cached.promise;
  } catch (error) {
    if (error instanceof Error) {
      console.error("MongoDB connection failed:", error.message);
    }
    cached.promise = null; 
    throw error;
  }
};

export default connectDB;
