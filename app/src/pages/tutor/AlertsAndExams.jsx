import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAnnouncement from "./components/AddAnnouncements";
import AddExams from "./components/AddExams";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import SendTimeExtensionIcon from '@mui/icons-material/SendTimeExtension';
import TimerIcon from '@mui/icons-material/Timer';
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

function AlertsAndExams() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todayAnnouncemnets, setTodayAnnouncements] = useState(0)
  const [pendingExams, setPendingExams] = useState(0)

  useEffect(() => {
    setError(null);

    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/announcements`)
      .then((response) => {
        setAnnouncements(response.data.announcements);

        console.log(response.data.announcements)

        const todayDate = new Date();
        const filteredAnnouncements = response.data.announcements.filter((announcement) => {
          const announcementDate = new Date(announcement.dateCreated);
          return announcementDate.toDateString() === todayDate.toDateString();
        });

        setTodayAnnouncements(filteredAnnouncements);
      })
      .catch((error) => {
        setError("Error fetching announcements: " + error.message);
        console.error("Error fetching announcements:", error);
      });

    // Fetch exams
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/exams/`)
      .then((response) => {
        setExams(response.data.exams);
        const currentDateTime = new Date();
        const filteredExams = response.data.exams.filter((exam) => {
          const examTime = new Date(exam.examTime);
          return examTime <= currentDateTime;
        });

        setPendingExams(filteredExams);
      })
      .catch((error) => {
        setError("Error fetching exams: " + error.message);
        console.error("Error fetching exams:", error);
      })
      .finally(() => {
        // Set loading to false when both requests are completed (success or error)
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full gap-3 p-2 bg h-[85vh] overflow-y-scroll">
      <span className="flex items-center mb-0" onClick={() => setShowAnnouncement(!showAnnouncement)}>
        <hr className="border-t border-slate-400 mx-1 w-4" />
        <span className="text-primary text-xl italic md:text-xl font-semibold">
          Create {showAnnouncement ? "Exams " : "Annoucements"} Instead
        </span>
        <hr className="border-t border-slate-400 mx-1 flex-grow" />
      </span>
      <div className="flex w-full h-full gap-3 p-1 rounded-md overflow-y-scroll">
        <div className="flex flex-col h-full w-2/3">
          {showAnnouncement ? <AddAnnouncement /> : <AddExams />}
          <div className="p-3 rounded-md grid grid-cols-4 gap-4 w-full h-full border mt-3 bg-gray-900 ">
            <div className="flex justify-center items-center p-4 gap-2 border">
              {" "}
              <span>
                <PlayLessonIcon />  {announcements.length > 0 ? announcements.length : 0}
              </span>{" "}
              Announcements
            </div>
            <div className="flex justify-center items-center p-4 gap-2 border">
              {" "}
              <span>
                <PendingActionsIcon />  {pendingExams.length > 0 ? pendingExams.length : 0}
              </span>{" "}
              Exams
            </div>
            <div className="flex justify-center items-center p-4 gap-2 border">
              {" "}
              <span>
                <SendTimeExtensionIcon />  {announcements.length > 0 ? announcements.length : 0}
              </span>{" "}
              Pending Exams
            </div>
            <div className="flex justify-center items-center p-2 gap-2 border">
              <span className="text-md">
                <TimerIcon />  {todayAnnouncemnets.length > 0 ? todayAnnouncemnets.length : 0}
              </span>{" "}
              Announcements Today
            </div>
          </div>
        </div>
        <div className="flex flex-col w-1/3 rounded-md overflow-hidden border bg-gray-900">
          {/* Render announcements and exams here */}
          <div className="h-full rounded-md relative">
            {/* Conditionally render loading state */}
            {isLoading && <div><CircularProgress /></div>}

            {/* Conditionally render error state */}
            {error && <div>Error: {error}</div>}

            <h2 className="flex-1 p-2 font-semibold top-1 bg-gray-900">Announcements and Examss</h2>
            {/* Conditionally render items when data is loaded successfully */}
            {!isLoading && !error && (
              <div className="w-full px-3 relative h-full pb-4 overflow-y-scroll">
                {/* Render your announcements */}
                <ul className="grid grid-cols-1 mb-4 gap-4 pt-3">
                  {announcements.length > 0 &&
                    announcements.map((announcement) => (
                      <li
                        key={announcement._id}
                        className="bg-slate-800 shadow-lg rounded-lg overflow-hidden pb-2"
                      >
                        <div className="px-6 py-4">
                          <div className="flex w-full justify-between">
                            <h3 className="text-md font-semibold mb-1">
                              {announcement.header}
                            </h3>
                            <p className="text-gray-400 text-sm capitalize">
                              Urgency: {announcement.urgency}
                            </p>
                          </div>
                          <p className="text-gray-400 text-sm mb-1 capitalize">
                            Audience: {announcement.audience}
                          </p>
                          <p className="text-gray-300 capitalize text-base">
                            {announcement.text}
                          </p>
                          <p className="text-gray-600 italic">
                            Uploader: {announcement.uploaderName}
                          </p>
                        </div>
                        <div className="px-6 py-0">
                          <div className="flex w-full justify-between">
                            <span className="text-gray-500">
                              Created On:{" "}
                              {new Date(
                                announcement.dateCreated
                              ).toLocaleDateString()}
                            </span>
                            <span className="text-gray-500">
                              Expiry Time:{" "}
                              {new Date(
                                announcement.expiryTime
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          {/* <p className="text-gray-600">
                            Urgency: {announcement.urgency}
                          </p> */}
                        </div>
                      </li>
                    ))}
                </ul>
                <hr />
                <h2 className="w-full p-2 font-semibold">Exams</h2>
                <ul className="grid grid-cols-1 gap-4">
                  {exams.length > 0 &&
                    exams.map((exam) => (
                      <li
                        key={exam._id}
                        className="bg-slate-800 shadow-lg rounded-lg overflow-hidden"
                      >
                        <div className="px-6 py-4">
                          <div className="flex flex-col items-start justify-between">
                            <h3 className="text-md font-semibold">
                              {exam.courseName}
                            </h3>
                            <span className="text-md opacity-95 text-gray-400 font-semibold">
                              {exam.lectureName}
                            </span>
                            <p className="text-gray-300 font-semibold">
                              Duration: {exam.examDuration} minutes
                            </p>
                            <span className="text-gray-400">
                              Exam Time:{" "}
                              {new Date(exam.examTime).toLocaleString()}
                            </span>
                          </div>


                          <p className="text-gray-300 italic">
                            Uploader: {exam.uploaderName}
                          </p>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertsAndExams;
