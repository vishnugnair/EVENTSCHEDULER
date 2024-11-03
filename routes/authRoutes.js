import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (user) {
      // Authenticate the existing user
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
    } else {
      // Register the new user
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name, email, password: hashedPassword });
      await user.save();
    }
    res.json({ message: "User authenticated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
