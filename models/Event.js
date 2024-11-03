import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event_name: { type: String, required: true }, // New field for event name
  start_time: { type: Number, required: true },
  end_time: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now, expires: "24h" }, // TTL index
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
