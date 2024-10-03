import express from "express";
import mongoose from "mongoose";
import Bus from "../models/Bus.js";
import Booking from "../models/Booking.js";

const router = express.Router();

// Route to get all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("busDetails");
    const totalItems = bookings.length;

    res.status(200).json({
      success: true,
      message: "Successfully retrieved all bookings",
      totalItems: totalItems,
      bookings: bookings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bookings",
      error: error.message,
    });
  }
});

// Route to delete all bookings
router.get("/delete", async (req, res) => {
  try {
    await Booking.deleteMany(); // Delete all bookings
    res.status(200).json({
      success: true,
      message: "All bookings deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete all bookings",
      error: error.message,
    });
  }
});


router.post("/book", async (req, res) => {
  try {
    const { busInfo, amount, reserveSpecialSeat, ...rest } = req.body;

    // Find the bus using the ID in busInfo
    const bus = await Bus.findById(busInfo._id);

    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    // Check if bus still has available capacity
    if (bus.capacity <= 0) {
      return res.status(400).json({ error: "Bus is fully booked" });
    }

    // Check if a special seat is being reserved
    if (reserveSpecialSeat === "yes") {
      if (bus.reservedSeats <= 0) {
        return res.status(400).json({ error: "No reserved seats available" });
      }
      // Decrease the reserved seats count by 1
      bus.reservedSeats -= 1;
    }

    // Decrease the bus capacity by 1 (for any booking)
    bus.capacity -= 1;

    // Save the updated bus information
    await bus.save();

    const busNumberPlate = bus.numberPlate;
    const randomNum1 = Math.floor(Math.random() * 100);
    const randomNum2 = Math.floor(Math.random() * 100);
    const randomLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    );
    const bookingCode = `${busNumberPlate}_${randomNum1}${randomNum2}${randomLetter}`;

    // Create a new booking
    const booking = new Booking({
      busDetails: bus._id,
      amountPaid: Number(amount),
      paymentDate: new Date(),
      bookingCode: bookingCode,
      reserveSpecialSeat: reserveSpecialSeat === "yes", // Store if special seat was reserved
    });

    // Save the booking
    const savedBooking = await booking.save();

    res.json(savedBooking);
  } catch (error) {
    console.error("Error booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



export default router;
