import express from "express";
import cloudinary from "cloudinary";
import multer from "multer";
import { promises as fsPromises } from "fs";
import CourseModel from "../models/courseModel.js";

const router = express.Router();

// Configure Cloudinary with your API credentials
cloudinary.config({
  cloud_name: "djv535hkn",
  api_key: "274896557448291",
  api_secret: "iepl7T-37dS5_Jecj1OBe9ZXf8o",
});

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Express route for handling file uploads
router.post("/", upload.array("files"), async (req, res) => {
  try {
    const pdfUrls = []; // Initialize an array to store PDF URLs

    for (const file of req.files) {
      const tempFilePath = `/tmp/${Date.now()}-${file.originalname}`;
      await fsPromises.writeFile(tempFilePath, file.buffer);

      const result = await cloudinary.uploader.upload(tempFilePath, {
        folder: "course-materials",
      });

      await fsPromises.unlink(tempFilePath);

      // Extract course details from req.body for each file
      const courseType = req.body.courseType;
      const courseName = req.body.courseName;
      const contentType = req.body.contentType;
      const uploaderName = req.body.uploaderName;
      const itemName = req.body.itemName;
      const materialType = "pdf";

      // Push the PDF URL to the array
      pdfUrls.push(result.secure_url);

      // Create a new course document and save it to MongoDB
      const newCourse = new CourseModel({
        courseName,
        itemName,
        courseType: contentType,
        uploaderName,
        url: result.secure_url, // Use the Cloudinary URL
        materialType,
      });

      await newCourse.save();
    }

    // Send the array of PDF URLs as a response
    res.status(200).json({
      pdfUrls,
      message: "Files uploaded and courses added successfully",
    });
  } catch (error) {
    console.error("Error uploading files and adding courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    // Query the database to retrieve all course materials
    const allMaterials = await CourseModel.find();

    // Send the all materials as a response
    res.status(200).json({
      allMaterials,
      message: "All course materials retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving all course materials:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:materialId", async (req, res) => {
  try {
    const materialId = req.params.materialId;

    // Query the database to retrieve the material (PDF) by materialId
    const material = await CourseModel.findById(materialId);

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    // Send the material (PDF) as a response
    res.status(200).json({
      material,
      message: "Material retrieved successfully",
    });
  } catch (error) {
    console.error("Error retrieving material (PDF):", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/name/:userId", async (req, res) => {
  try {
    const userId = req.params.uploaderName;

    // Query the database to retrieve videos by uploaderName
    const materialByUploader = await CourseModel.find({
      materialType: "pdf",
      uploaderName: userId,
    });

    if (!materialByUploader || materialByUploader.length === 0) {
      return res.status(404).json({ message: "No videos found for uploader" });
    }

    // Send the videos as a response
    res.status(200).json({
      allMaterials: materialByUploader,
      message: "Videos retrieved successfully by uploaderName",
    });
  } catch (error) {
    console.error("Error retrieving videos by uploaderName:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/course/:courseName", async (req, res) => {
  try {
    const courseName = req.params.courseName;

    // Query the database to retrieve videos by courseName
    const matrialByCourse = await CourseModel.find({
      materialType: "pdf",
      courseName: courseName,
    });

    if (!matrialByCourse || matrialByCourse.length === 0) {
      return res.status(404).json({ message: "No videos found for uploader" });
    }

    // Send the videos as a response
    res.status(200).json({
      allMaterials: matrialByCourse,
      message: "Videos retrieved successfully by courseName",
    });
  } catch (error) {
    console.error("Error retrieving videos by courseName:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
