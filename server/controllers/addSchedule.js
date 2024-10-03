import express from "express";
import scheduleModel from "../models/scheduleModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      courseName,
      lectureName,
      courseLecturer,
      timeOfSubject,
      dayOfSubject,
    } = req.body;

    // Create a new schedule document and save it to MongoDB
    const newSchedule = new scheduleModel({
      courseName,
      lectureName,
      courseLecturer,
      timeOfSubject,
      dayOfSubject,
    });

    await newSchedule.save();

    res.json({ success: true, schedule: newSchedule });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to add schedule", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchedSchedules = await scheduleModel.find();

    res.json({ success: true, schedules: fetchedSchedules });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch schedules", error });
  }
});

export default router;
