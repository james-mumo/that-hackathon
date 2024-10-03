import mongoose from "mongoose";

const TutorSchema = new mongoose.Schema({
  fullname: String,
  password: String,
  profImage: String,
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: String,
  schoolOf: String,
  coursesTaught: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  typeOfEmployment: {
    type: String,
    enum: ["Permanent", "Part-Time"],
  },
  registrationNumber: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
    default: null,
  },
  dateOfSignup: {
    type: Date,
    default: Date.now,
  },
});

const TutorModel = mongoose.model("Tutor", TutorSchema);

export default TutorModel;
