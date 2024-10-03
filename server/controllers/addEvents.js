import express from "express";
import Event from "../models/eventModel.js";

const router = express.Router();

// Create a new event
router.post("/events", (req, res) => {
  const { title, start, end, color, admin_id, school, lecturer } = req.body;

  const newEvent = new Event({
    title,
    start,
    end,
    color,
    admin_id,
    school,
    lecturer,
  });

  newEvent
    .save()
    .then((savedEvent) => {
      res.status(201).json(savedEvent);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Retrieve all events
router.get("/events", (req, res) => {
  Event.find({})
    .then((events) => {
      res.status(200).json(events);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

export default router;
