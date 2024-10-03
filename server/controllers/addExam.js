import express from "express";
import Exam from "../models/examModel.js"; // Import the Mongoose model
import Announcement from "../models/announcementModel.js";

const router = express.Router();

// Create a new exam
router.post("/add", async (req, res) => {
  try {
    const {
      uploaderName,
      courseName,
      examTime,
      examDuration,
      questions,
      pdfUrls,
      lectureName,
    } = req.body;

    // Create a new exam document using the Mongoose model
    const newExam = new Exam({
      uploaderName,
      courseName,
      examTime,
      examDuration,
      lectureName,
      questions,
      pdfUrls,
    });
    const alertBody = {
      header: "New Exam!!",
      text: `${lectureName} exam.`,
      audience: courseName,
      urgency: "high",
      uploaderName: uploaderName,
      expiryTime: examTime,
    };
    const newAnnouncement = new Announcement(alertBody);
    const savedAnnouncement = await newAnnouncement.save();

    // Save the new exam to the database
    await newExam.save();

    // Respond to the client
    res
      .status(200)
      .json({ message: newExam, savedAnnouncement: savedAnnouncement });
  } catch (error) {
    console.error("Error submitting exam details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Retrieve all exams
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json({ exams: exams });
  } catch (error) {
    console.error("Error fetching exams:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add more routes for updating and deleting exams if needed

export default router;
