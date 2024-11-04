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

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
