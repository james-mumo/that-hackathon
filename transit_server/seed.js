import express from "express";
import mongoose from "mongoose";
import { appName, minibuses, routes, buses, trucks } from "./data.js";

const app = express();
// uri
const uri = `mongodb+srv://98kithome:98kithome@cluster0.ijx96ju.mongodb.net/metro_mate_web_new`;
// const uri = "mongodb://localhost:27017/metro_mate_web";

// MongoDB connection
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    // Seed data
    seedData();
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define Mongoose schemas and models
const minibusSchema = new mongoose.Schema({
  id: Number,
  name: String,
  capacity: Number,
});

const routeSchema = new mongoose.Schema({
  id: Number,
  name: String,
  stages: [
    {
      name: String,
      next: String,
      distance: Number,
      time: Number,
      fare: Number,
    },
  ],
});

const busSchema = new mongoose.Schema({
  id: Number,
  busNo: String,
  routeId: Number,
  to: String,
  currentLocation: String,
  distanceToCurrentLocation: Number,
  timeToCurrentLocation: Number,
  distanceToStage: Number,
  timeToStage: Number,
  capacity: Number,
  sacco: String,
  numberPlate: String,
  wheelchairAccessible: Boolean,
  rampAvailability: Boolean,
  reservedSeats: Number,
  stepFreeAccess: Boolean,
});

const truckSchema = new mongoose.Schema({
  company: String,
  numberPlate: String,
  capacity: String,
  pricePerHirePerHour: Number,
  currentLocation: String,
  vehicleType: String,
  yearMade: Number,
  availability: Number,
});

const Minibus = mongoose.model("Minibus", minibusSchema);
const Route = mongoose.model("Route", routeSchema);
const Bus = mongoose.model("Bus", busSchema);
const Truck = mongoose.model("Truck", truckSchema);

// Function to seed data into MongoDB
async function seedData() {
  try {
    // Clear existing data
    // await Minibus.deleteMany({});
    await Route.deleteMany({});
    await Bus.deleteMany({});
    await Truck.deleteMany({});

    // Insert new data
    // await Minibus.insertMany(minibuses);
    await Route.insertMany(routes);
    await Bus.insertMany(buses);
    await Truck.insertMany(trucks);

    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`${appName} server is running on port ${port}`);
});
