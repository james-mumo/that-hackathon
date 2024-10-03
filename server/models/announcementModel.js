// models/announcement.js
import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  audience: {
    type: String,
    default: "all",
  },
  expiryTime: {
    type: Date,
    default: Date.now,
  },
  urgency: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  uploaderName: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now, // Set the default value to the current date and time
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

export default Announcement;
