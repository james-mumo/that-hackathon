import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  id: Number,
  busNo: String,
  // routeId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Route", // Reference to the Route model
  // },
  routeId: Number,
  to: String,
  currentLocation: String,
  distanceToCurrentLocation: Number,
  timeToCurrentLocation: Number,
  distanceToStage: Number,
  timeToStage: Number,
  capacity: {
    type: Number,
    required: true,
    min: [0, "Capacity cannot be negative"],
  },
  sacco: String,
  numberPlate: String,
  wheelchairAccessible: Boolean,
  rampAvailability: Boolean,
  reservedSeats: Number,
  stepFreeAccess: Boolean,
  vehicleType: {
    type: String,
    enum: ["bus", "van", "minibus"],
  },
});

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
