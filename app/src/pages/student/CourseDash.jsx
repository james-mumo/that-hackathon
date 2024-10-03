import React, { useState, useEffect } from "react";
import axios from "axios";
import SchedulerComp from "../../components/ScheduleComp";

const CourseDash = () => {

  const [schedules, setSchedules] = useState([])
  const [announcements, setAnnouncements] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}api/schedule/`)
      .then((response) => {
        setSchedules(response.data.schedules);
        console.log(response.data.schedules)
      })
      .catch((error) => {
        console.error("Error fetching exams:", error);
      });


    axios.get(`${process.env.REACT_APP_BACKEND_URL}api/announcements/`)
      .then((response) => {
        setAnnouncements(response.data.announcements);
        console.log(response.data.announcements)
      })
      .catch((error) => {
        console.error("Error fetching announcements:", error);
      });
  }, []);

  return (
    <div className="w-full flex flex-col p-2 space-y-4 md:space-y-0 h-screen bg">
      <div className="flex flex-col w-full">
        <span className="flex items-center mb-2">
          <hr className="border-t border-slate-400 mx-1 w-4" />
          <span className="text-primary text-xl italic md:text-xl font-semibold">
            Course Dashboard
          </span>
          <hr className="border-t border-slate-400 mx-1 flex-grow" />
        </span>
        <div className="flex flex-row gap-2 rounded-md w-full">
          <div className="flex flex-1 rounded-md p-2 flex-col bg-gray-900 border">
            <h3 className="text-lg font-semibold">Bsc. Computer Science</h3>
            <p className="text-gray-600">
              <span className="font-semibold"> Year: </span> 3<sup>rd</sup> Sem 1
            </p>
            <hr />
            <div className="overflow-y-scroll h-[520px] p-1 py-3">
              {schedules.length > 0 && schedules.map((schedule) => (
                <div key={schedule._id} className="mb-4 bg-slate-800 p-2 rounded-md">
                  <h5 className="text-md font-semibold">{schedule.courseName}</h5>
                  <p>Instructor: {schedule.courseLecturer}</p>
                  <p>Time: {schedule.dayOfSubject}{" "}{schedule.timeOfSubject}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 flex-1 p-4 rounded-md w-full border shadow">
            <div className="w-full font-semibold border-b py-2">Announcements</div>
            <div className="grid grid-cols-1 mb-4 gap-2 pt-3 overflow-y-scroll h-[520px] px-2 pb-2">
              {announcements.length > 0 &&
                announcements.map((announcement) => (
                  <div
                    key={announcement._id}
                    className="bg-slate-800 border border-gray-400 shadow-lg h-max rounded-lg py-2 overflow-hidden pb-0"
                  >
                    <div className="px-2 py-1">
                      <div className="flex w-full justify-between items-center">
                        <h3 className="text-md font-semibold">
                          {announcement.header}
                        </h3>
                        <span className="text-gray-400 capitalize mb-0 text-sm italic">
                          Urgency: {announcement.urgency}
                        </span>
                      </div>
                      <p className="text-gray-400 capitalize mb-2 text-sm italic">
                        Audience: {announcement.audience}
                      </p>
                      <p className="text-gray-300 capitalize mb-2 text-md">
                        {announcement.text}
                      </p>
                      <p className="text-gray-500 text-sm italic">
                        Creator: {announcement.uploaderName}
                      </p>
                    </div>
                    <div className="px-2 py-0">
                      <div className="flex w-full justify-between">
                        <span className="text-gray-500 text-sm">
                          Created On:{" "}
                          {new Date(
                            announcement.dateCreated
                          ).toLocaleDateString()}
                        </span>
                        <span className="text-gray-500 text-sm">
                          Expiry Time:{" "}
                          {new Date(
                            announcement.expiryTime
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex p-2 h-fit rounded-md border w-fit">
            <SchedulerComp />
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div className="flex justify flex-col mt-2">
          <h3 className="text-lg font-semibold px-4 py-0 bg-blue-500 text-white">Ongoing Class</h3>
          <div className="flex bg-white shadow-lg overflow-hidden w-full items-center gap-3">
            <div className="px-4 w-2/3 flex py-2 flex-3 gap-4">
              <div className="w-1/2">
                <div className="flex gap-2">
                  <span className="text-gray-700 font-semibold">Class Title: </span>
                  <span className="font-semibold text-gray-500">Class One</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-700 font-semibold">Instructor: </span>
                  <p className="text-gray-700">John Doe</p>
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex gap-2">
                  <span className="text-gray-700 font-semibold">Time: </span>
                  <span className="font-semibold text-gray-500">10 Am to 11 Pm</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-700 font-semibold">Location: </span>
                  <p className="text-gray-700">Virtual</p>
                </div>
              </div>
            </div>

            <a href="#" className="flex flex-1 h-9 justify-center items-center rounded-md px-2 text-center bg-blue-500 text-white py-2 hover:bg-blue-800 transition duration-300 ease-in-out">Join Class</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDash;
