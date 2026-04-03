import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import requirementRoutes from "./routes/requirementRoutes";

const PORT: number | string = process.env.PORT || 8080;

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/requirements", requirementRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is Running",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error: any) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
