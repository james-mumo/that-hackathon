import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  fullname: String,
  password: String,
  profImage:String,
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: String,
  courseName: String,
  registrationNumber: {
    type: String,
    unique: true,
  },
  year: String,
  session: String,
  dateOfSignup: {
    type: Date,
    default: Date.now,
  },
});

const StudentModel = mongoose.model("Student", StudentSchema);

export default StudentModel;
