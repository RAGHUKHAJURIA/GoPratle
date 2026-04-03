import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import requirementRoutes from "./routes/requirementRoutes";

const app: Express = express();

app.use(cors());
app.use(express.json());

// Ensure Database is connected before handling requests
app.use(async (req: Request, res: Response, next: express.NextFunction) => {
  try {
    await connectDB();
    next();
  } catch (error: any) {
    console.error("Error in DB connection middleware:", error);
    res.status(500).json({ 
      success: false, 
      message: "Database connection error",
      error: error.message
    });
  }
});

// Routes
app.use("/api/requirements", requirementRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is Running on Vercel Context",
  });
});


if (process.env.NODE_ENV !== "production") {
  const PORT: number | string = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express App for Vercel Serverless Function
export default app;
