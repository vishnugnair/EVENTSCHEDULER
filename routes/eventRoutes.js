import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

router.post("/addevent", async (req, res) => {
  const { userId, event_name, start_time, end_time } = req.body;

  console.log("Received request to add event with data:", {
    userId,
    event_name,
    start_time,
    end_time,
  });

  try {
    if (
      !userId ||
      !event_name ||
      typeof start_time !== "number" ||
      typeof end_time !== "number"
    ) {
      console.error("Invalid data provided:", {
        userId,
        event_name,
        start_time,
        end_time,
      });
      return res.status(400).json({ message: "Invalid input data" });
    }

    const newEvent = new Event({ userId, event_name, start_time, end_time });
    await newEvent.save();

    console.log("Event added successfully:", newEvent);
    res
      .status(201)
      .json({ message: "Event added successfully", event: newEvent });
  } catch (error) {
    console.error("Error while adding event:", error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  console.log("Received request to fetch events for userId:", userId);

  try {
    const events = await Event.find({ userId });
    console.log("Events fetched successfully for userId:", userId, events);
    res.json(events);
  } catch (error) {
    console.error("Error while fetching events:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
