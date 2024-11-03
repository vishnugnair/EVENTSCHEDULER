import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

// MongoDB connection setup (not relevant for now, can be configured later)

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Serve static files from the React app in production
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/build")));

// Catch-all handler for any requests that don't match the above routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
