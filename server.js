import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import dotenv from "dotenv";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const mongoURI = process.env.MONGOURI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Serve static files from the React app
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/build")));

// Catch-all handler to serve the React app for any unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
