import express from "express";
import multer from "multer"; // for handling file uploads
import { v2 as cloudinary } from "cloudinary";
import CourseModel from "../models/courseModel.js";
const router = express.Router();
const upload = multer({ dest: "uploads/" }); // specify an upload directory

cloudinary.config({
  cloud_name: "djv535hkn",
  api_key: "274896557448291",
  api_secret: "iepl7T-37dS5_Jecj1OBe9ZXf8o",
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });
    // console.log(`Successfully uploaded video: ${req.file.originalname}`);
    // console.log(`> Result: ${result.secure_url}`);

    // Get the course name from the request body
    const courseName = req.body.courseName;
    const uploaderName = req.body.uploaderName;
    const courseType = req.body.courseType;
    const itemName = req.body.itemName;
    const materialType = "video";

    // Create a new course document and save it to MongoDB
    const newCourse = new CourseModel({
      courseType,
      courseName,
      uploaderName,
      itemName,
      url: result.secure_url,
      materialType,
    });

    await newCourse.save();

    // console.log(newCourse)

    res.json({
      success: true,
      url: result.secure_url,
      courseName: courseName,
      itemName: itemName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

router.get("/", async (req, res) => {
  try {
    // Query the database to retrieve all video materials
    const allVideos = await CourseModel.find({ materialType: "video" });

    // Send the all videos as a response
    res.status(200).json({
      allVideos,
      message: "All video materials retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving all video materials:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;

    // Query the database to retrieve the video material by videoId
    const video = await CourseModel.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Send the video as a response
    res.status(200).json({
      video,
      message: "Video material retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving video material:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/name/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Query the database to retrieve videos by user ID
    const videosByUser = await CourseModel.find({
      materialType: "video",
      uploaderName: userId,
    });

    if (!videosByUser || videosByUser.length === 0) {
      return res.status(404).json({ message: "No videos found for this user" });
    }

    // Send the videos as a response
    res.status(200).json({
      allVideos: videosByUser,
      message: "Videos retrieved successfully by user ID",
    });
  } catch (error) {
    console.error("Error retrieving videos by user ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/course/:courseName", async (req, res) => {
  try {
    const courseName = req.params.courseName;

    // Query the database to retrieve videos by courseName
    const videosByUploader = await CourseModel.find({
      materialType: "video",
      courseName: courseName,
    });

    if (!videosByUploader || videosByUploader.length === 0) {
      return res.status(404).json({ message: "No videos found for uploader" });
    }

    // Send the videos as a response
    res.status(200).json({
      allVideos: videosByUploader,
      message: "Videos retrieved successfully by courseName",
    });
  } catch (error) {
    console.error("Error retrieving videos by courseName:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
