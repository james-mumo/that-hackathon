import express from "express";
const router = express.Router();
import Announcement from "../models/announcementModel.js";

// Create a new announcement
router.post("/add", async (req, res) => {
  try {
    const newAnnouncement = new Announcement(req.body);
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json({
      savedAnnouncement: savedAnnouncement,
      message: "Announcement added successfully",
    });
  } catch (error) {
    console.error("Error adding announcement:", error);
    res.status(500).json({ error: "Could not add announcement" });
  }
});

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json({
      announcements: announcements,
      message: "Announcements retrieved successfully",
    });
  } catch (error) {
    console.error("Error getting announcements:", error);
    res.status(500).json({ error: "Could not retrieve announcements" });
  }
});

export default router;
