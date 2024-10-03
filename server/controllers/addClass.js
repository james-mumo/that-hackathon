import express from "express";
import multer from "multer"; // for handling file uploads
import { v2 as cloudinary } from "cloudinary";
import classModel from "../models/classModel.js";
import Announcement from "../models/announcementModel.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" }); // specify an upload directory

cloudinary.config({
  cloud_name: "djv535hkn",
  api_key: "274896557448291",
  api_secret: "iepl7T-37dS5_Jecj1OBe9ZXf8o",
});

router.post("/video", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });
    console.log(req.file);

    const courseName = req.body.courseName;
    const lectureName = req.body.lectureName;
    const courseLecturer = req.body.courseLecturer;
    const timeOfSubject = req.body.lectureTime;
    const uploaderName = req.body.uploaderName;
    const courseType = req.body.courseType;
    const pdfUrls = req.body.pdfUrls;
    const materialType = "video";

    // Create a new course document and save it to MongoDB
    const newClass = new classModel({
      courseName,
      lectureName,
      courseLecturer,
      timeOfSubject,
      uploaderName,
      courseType,
      materialType,
      vidUrl: result.secure_url,
      pdfUrls,
    });

    const alertBody = {
      header: "New Class Added!!",
      text: `${lectureName}.`,
      audience: courseName,
      urgency: "medium",
      uploaderName: courseLecturer,
    };
    const newAnnouncement = new Announcement(alertBody);
    const savedAnnouncement = await newAnnouncement.save();

    await newClass.save();

    // console.log(newClass);

    res.json({ success: true, class: newClass });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    const fetchedClasses = await classModel.find();

    res.json({ success: true, fetchedClasses });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch classes", error });
  }
});
router.get("/id/:courseLecturer", async (req, res) => {
  const uploaderID = req.params.courseLecturer;

  try {
    const fetchedClasses = await classModel.find({
      courseLecturer: "6512da900d078f0610c876e6", // No need for String() conversion
    });

    res.json({ success: true, fetchedClasses });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch classes", error });
  }
});

router.get("/:courseName", async (req, res) => {
  const { courseName } = req.body;
  try {
    const fetchedClasses = await classModel.find({ courseName: courseName });

    res.json({ success: true, fetchedClasses });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch classes", error });
  }
});

router.put("/:id", async (req, res) => {
  const courseId = req.params.id;
  const userId = req.body.userId;
  console.log(req.body);
  try {
    const course = await classModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    course.attendance.push(userId);

    await course.save();

    return res.status(200).json({ message: "Attendance updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
