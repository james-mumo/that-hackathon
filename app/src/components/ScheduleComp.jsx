import React, { useEffect, useState } from "react";
import { Scheduler } from "@aldabil/react-scheduler";
import axios from 'axios';
import EVENTS from "./EVENTS"

function SchedulerComp() {
  const [addedEvents, setAddedEvents] = useState([]); // Local state to store added events
  const [remoteEvents, setRemoteEvents] = useState([]); // Local state to store fetched events

  const fetchRemote = async () => {
    try {
      // Fetch events from the remote endpoint using a GET request
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/events/events`);
      setRemoteEvents(response.data);
    } catch (error) {
      console.error("Error fetching remote events:", error);
    }
  };

  const handleConfirm = async (event, action) => {
    console.log("handleConfirm =", action, event.title);

    return new Promise(async (res, rej) => {
      if (action === "edit") {
        /** PUT event to remote DB */
      } else if (action === "create") {
        try {
          // Send the created event to the remote DB using a POST request
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/events/events`, event);

          // Update the event_id with the response from the server
          event.event_id = response.data.event_id;

          // Save the created event in the local state
          setAddedEvents([...addedEvents, event]);

          res(event);
        } catch (error) {
          rej("Ops... Failed to create event");
        }
      }

      const isFail = Math.random() > 0.6;
      // Make it slow just for testing
      setTimeout(() => {
        if (isFail) {
          rej("Ops... Failed");
        } else {
          res(event);
        }
      }, 3000);
    });
  };

  const handleDelete = async (deletedId) => {
    // Simulate http request: return the deleted id
    return new Promise((res, rej) => {
      setTimeout(() => {
        res(deletedId);
      }, 3000);
    });
  };

  useEffect(() => {
    // Fetch remote events when the component mounts
    fetchRemote();
  }, []);

  useEffect(() => {
  }, [addedEvents]); // Log the added events whenever the addedEvents array changes

  return (
    <div>
      <Scheduler
        events={EVENTS || remoteEvents.concat(addedEvents)} // Combine fetched and added events
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        height={500}
        view="month"
      />
    </div>
  );
}

export default SchedulerComp;
