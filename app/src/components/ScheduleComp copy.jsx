import React, { useEffect, useState } from "react";

import EVENTS from "./EVENTS";
import { Scheduler } from "@aldabil/react-scheduler"; // Make sure to import Scheduler from the correct location

function SchedulerComp() {
  const fetchRemote = async (query) => {
    console.log({ query });
    // Simulate fetching remote data
    return new Promise((res) => {
      setTimeout(() => {
        res(EVENTS);
      }, 1000);
    });
  };

  const handleConfirm = async (event, action) => {
    console.log("handleConfirm =", action, event.title);

    return new Promise((res, rej) => {
      if (action === "edit") {
        /** PUT event to remote DB */
      } else if (action === "create") {
        /** POST event to remote DB */
      }

      const isFail = Math.random() > 0.6;
      // Make it slow just for testing
      setTimeout(() => {
        if (isFail) {
          rej("Ops... Failed");
        } else {
          res({
            ...event,
            event_id: event.event_id || Math.random(),
          });
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

  return (
    <Scheduler
      getRemoteEvents={fetchRemote}
      onConfirm={handleConfirm}
      onDelete={handleDelete}
      height={500}
      view="month"
    />
  );
}

export default SchedulerComp;
