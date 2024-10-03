import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { writeFileSync, unlinkSync } from 'fs';
import TutorModel from "../models/TutorModel.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'djv535hkn',
  api_key: '274896557448291',
  api_secret: 'iepl7T-37dS5_Jecj1OBe9ZXf8o',
});

// Function to update user's image in MongoDB
async function updateUserImage(userId, imageUrl) {
  try {
    // Check if the user exists
    const user = await TutorModel.findById(userId );
    if (!user) {
      console.error(`User with userId ${userId} not found.`);
      return false;
    }
    const updateResult = await TutorModel.findByIdAndUpdate(
      userId, // ID to filter
      { $set: { image: imageUrl } }, // Update only the 'image' field
      { new: true } // Return the updated document
    );

    // console.log(updateResult)

    if (updateResult.image !== null) {
      return true; // Image updated successfully
    } else {
      console.error(`Failed to update image for user with userId ${userId}.`);
      return false;
    }
  } catch (error) {
    console.error('Error updating user image:', error);
    return false;
  }
}

  

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Convert the buffer to a temporary file
    const tempFilePath = './temp-image.png'; // Replace with a suitable file extension
    writeFileSync(tempFilePath, req.file.buffer);

    // Upload the temporary file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath);
    const imageUrl = result.secure_url;

    // Delete the temporary file
    unlinkSync(tempFilePath);

    const userId = req.body.userId;

    // Update the user's image in MongoDB
    const updateSuccess = await updateUserImage(userId, imageUrl);

    if (updateSuccess) {
      res.status(200).json({ message: 'File uploaded successfully.', imageUrl });
    } else {
      res.status(404).json({ error: 'User not found or failed to update image.' });
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred while uploading the file.' });
  }
});

export default router;
