import mongoose from "mongoose";
import Bus from "./Bus.js";

const bookingSchema = new mongoose.Schema({
  amountPaid: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
  },
  bookingCode: {
    type: String,
  },
  paymentDate: {
    type: Date,
    default: null,
  },
  busDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
  },
  reserveSpecialSeat: {
    type: Boolean, // Store as true or false
  },
});


const Booking = mongoose.model("Booking", bookingSchema);

// Middleware to update booked seats when a booking is made
bookingSchema.pre("save", async function (next) {
  const busId = this.busDetails;
  const bus = await Bus.findById(busId);
  if (bus) {
    bus.bookedSeats += 1; // Increment bookedSeats by 1
    await bus.save();
  }
  next();
});

export default Booking;
