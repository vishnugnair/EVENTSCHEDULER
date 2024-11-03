import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EventsPage() {
  const { state } = useLocation();
  const { user } = state;
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    event_name: "",
    start_time: "",
    end_time: "",
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${user._id}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, [user._id]);

  const checkOverlap = (newEvent) => {
    return events.some(
      (event) =>
        (newEvent.start_time >= event.start_time &&
          newEvent.start_time < event.end_time) ||
        (newEvent.end_time > event.start_time &&
          newEvent.end_time <= event.end_time) ||
        (newEvent.start_time <= event.start_time &&
          newEvent.end_time >= event.end_time)
    );
  };

  const handleAddEvent = async () => {
    const start = parseInt(eventData.start_time, 10);
    const end = parseInt(eventData.end_time, 10);

    if (
      !eventData.event_name ||
      isNaN(start) ||
      isNaN(end) ||
      start < 0 ||
      start >= end ||
      end > 23
    ) {
      toast.error(
        "Please enter a valid event name and time range (0-23, start < end)."
      );
      return;
    }

    const newEvent = { ...eventData, start_time: start, end_time: end };

    if (checkOverlap(newEvent)) {
      toast.error("This event overlaps with an existing event.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/events/addevent", {
        ...newEvent,
        userId: user._id,
      });
      toast.success("Event added successfully!");

      const response = await axios.get(
        `http://localhost:5000/api/events/${user._id}`
      );
      setEvents(response.data);

      setEventData({ event_name: "", start_time: "", end_time: "" });
    } catch (error) {
      console.error("Error adding event:", error);
      toast.error("Failed to add event.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-300 p-4">
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Welcome to {user.name}'s Event Scheduler!
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <input
          type="text"
          name="event_name"
          placeholder="Event Name"
          value={eventData.event_name}
          onChange={(e) =>
            setEventData({ ...eventData, event_name: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="start_time"
          placeholder="Start Time (0-23)"
          value={eventData.start_time}
          onChange={(e) =>
            setEventData({ ...eventData, start_time: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="number"
          name="end_time"
          placeholder="End Time (0-23)"
          value={eventData.end_time}
          onChange={(e) =>
            setEventData({ ...eventData, end_time: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddEvent}
          className="w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Add Event
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-8">Scheduled Events:</h3>
      <div className="w-full max-w-md mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-left text-gray-800">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Event Name</th>
              <th className="py-2 px-4">Start Time</th>
              <th className="py-2 px-4">End Time</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="border-b last:border-none">
                <td className="py-2 px-4 font-semibold">{event.event_name}</td>
                <td className="py-2 px-4">{event.start_time}:00</td>
                <td className="py-2 px-4">{event.end_time}:00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventsPage;
