import express from "express";
import StudentModel from "../models/StudentModel.js";
import TutorModel from "../models/TutorModel.js";

const router = express.Router();

export const signup = async (req, res) => {
  const {
    fullname,
    password,
    email,
    phoneNumber,
    courseName,
    registrationNumber,
    year,
    session,
  } = req.body;

  try {
    const existingUser = await StudentModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newUser = new StudentModel({
      fullname,
      password,
      email,
      phoneNumber,
      courseName,
      registrationNumber,
      year,
      session,
    });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", userData: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await StudentModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", userData: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const tutor_signup = async (req, res) => {
  const {
    fullname,
    password,
    email,
    phoneNumber,
    schoolOf,
    registrationNumber,
    typeOfEmployment,
  } = req.body;

  try {
    const existingUser = await TutorModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const newTutor = new TutorModel({
      fullname,
      password,
      email,
      phoneNumber,
      schoolOf,
      registrationNumber,
      typeOfEmployment,
    });

    await newTutor.save();

    res.status(201).json({ userData: newTutor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const tutor_login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const tutor = await TutorModel.findOne({ email });

    if (!tutor || tutor.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ userData: tutor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default router;
