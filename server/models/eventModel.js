import mongoose from "mongoose";

// Define the Event schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  color: String,
  lecturer: String,
  school: String, // Add the courseName field
});

// Create the Event model
const Event = mongoose.model("Event", eventSchema);

export default Event;
