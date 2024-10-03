import React from "react";

// Initialize the EVENTS array with the first event
const EVENTS = [
  {
    event_id: 1,
    title: "Event 11",
    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    disabled: true,
    admin_id: [1, 2, 3, 4],
  },
];

// Generate 6 additional events starting from date 25
const startDate = new Date(new Date().setDate(25)); // Start from the 25th of the current month

for (let i = 2; i <= 7; i++) {
  const newEvent = {
    event_id: i,
    title: `Event ${i}`,
    start: new Date(startDate.getTime()), // Clone the date object
    end: new Date(startDate.setHours(10)), // Set the end time to 10:00 AM
    admin_id: i,
  };

  EVENTS.push(newEvent);

  // Move the start date to the next day
  startDate.setDate(startDate.getDate() + 1);
}

export default EVENTS;
