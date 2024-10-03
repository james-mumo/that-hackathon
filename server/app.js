import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import imageUploadRouter from "./controllers/imageUploadRoute.js";
import materialUpload from "./controllers/materialUpload.js";
import videoUpload from "./controllers/videoUpload.js";
import addAnnouncement from "./controllers/addAnnouncements.js";
import addExam from "./controllers/addExam.js";
import addClass from "./controllers/addClass.js";
import addEvents from "./controllers/addEvents.js";
import addSchedule from "./controllers/addSchedule.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

mongoose.set("strictQuery", false);

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/auth", authRoutes);

app.use("/api/upload", imageUploadRouter);
app.use("/api/upload/pdf", materialUpload);
app.use("/api/upload/video", videoUpload);
app.use("/api/announcements", addAnnouncement);
app.use("/api/exams", addExam);
app.use("/api/class", addClass);
app.use("/api/events", addEvents);
app.use("/api/schedule", addSchedule);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
