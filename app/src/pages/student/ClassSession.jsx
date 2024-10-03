import React, { useEffect, useState } from "react";
import kenya from "../../assets/kenyaa.png";
import ReactPlayer from "react-player";
import NewClass from '../tutor/NewClass';
import axios from "axios";

function ClassSession() {

  function formatDateTime(date) {
    const options = {
      weekday: 'long',
      // year: 'numeric',
      // month: 'long',
      // day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      // second: 'numeric',
      // timeZoneName: 'short',
    };

    return date.toLocaleDateString(undefined, options);
  }

  function calculateEndTime(startTime) {
    // Clone the start time to avoid modifying the original object
    const endTime = new Date(startTime);

    // Add 3 hours to the start time
    endTime.setHours(startTime.getHours() + 3);

    // Format the end time as "hh:mm AM/PM"
    const hours = endTime.getHours();
    const minutes = endTime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }
  const [savedClasses, setSavedClasses] = useState([])
  const [savedClass, setSavedClass] = useState(false)
  const [classItem, setClassItem] = useState({})
  const [userItem, setUserItem] = useState({})

  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}api/class`)
        .then((response) => {
          setSavedClasses(response.data.fetchedClasses);
          console.log(response.data.fetchedClasses)
        })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    const l_classItem = JSON.parse(localStorage.getItem("classData"));
    const u__Item = JSON.parse(localStorage.getItem("userData"));
    setClassItem(l_classItem);
    setSavedClass(l_classItem)
    setUserItem(u__Item)
  }, [])

  const joinClass = async (cl) => {
    try {
      console.log(userItem._id)
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}api/class/${cl._id}`,
        { userId: userItem._id },
      );
      console.log(cl._id)
      console.log(response.data.message);

      setSavedClass(cl)
      localStorage.setItem(
        "classData",
        JSON.stringify(cl)
      );
      const l_classItem = JSON.parse(localStorage.getItem("classData"));
      setClassItem(l_classItem);
      console.log(l_classItem);
    } catch (error) {
      console.error(error.response.data.error);
    }

  }

  const exitClass = () => {
    setSavedClass(false)
    setClassItem(false)
    localStorage.removeItem("classData");
  }
  return (
    <div className="w-full flex bg flex-col p-1 space-y-4 md:space-y-0 h-screen">
      {!savedClass && <div className="flex w-full justify-center bg-slate-950 h-full rounded-md items-center">
        <div className="flex flex-col border h-[80vh] w-2/5 overflow-hidden rounded-md mt-2">
          <div className="w-full bg-gray-900 border-b"> <span className="text-xl px-3 py-2 flex font-semibold">Recorded Classes</span></div>
          <div className="flex flex-col bg w-full gap-3 overflow-y-scroll p-1">
            {savedClasses.length > 0 ? (savedClasses.map((cl) => (
              <div className="border flex flex-col w-full rounded-md cursor-pointer bg-slate-800 p-1">
                <span className="text-gray-300 font-semibold text-md">{cl.courseName}</span>
                <span className="text-gray-300 font-thin text-md">{cl.lectureName}</span>
                <span className="text-gray-300 font-semibold text-sm">Lecturer: <span className="font-thin">{cl.courseLecturer}</span></span>

                <div className="flex justify-between items-center pr-5">
                  <span className="text-gray-400 font-semibold text-sm">Start: {formatDateTime(new Date(cl.timeOfSubject))}</span>
                  <span className="text-gray-400 font-semibold text-sm">Study Materials <span className="font-thin">{cl.pdfUrls.length}</span></span>
                </div>
                <button
                  onClick={() => joinClass(cl)}
                  className="bg-gray-700 outline-none hover:bg-gray-900 font-semibold w-full mt-3 text-white transition duration-300 ease-in-out"
                >
                  Join Class
                </button>
              </div>
            ))) : (
              <span>No Class Items Saved</span>
            )}
          </div>
        </div>
      </div>
      }
      {savedClass && <div className="flex w-full p-2 bg-slate-950 flex-col border-r-emerald-700 rounded-md">
        <h2 className="text-2xl font-semibold">{savedClass?.courseName || classItem?.courseName}</h2>
        <span className="flex gap-3 justify-start items-center">
          <span className="text-gray-200 font-semibold">Lecture:  <span className="text-sm opacity-80 font-normal">{savedClass.lectureName || classItem?.lectureName}</span></span>
          <span className="text-gray-200 font-semibold">Tutor : <span className="text-sm font-normal opacity-80">{savedClass.courseLecturer || classItem?.courseLecturer}</span></span>
        </span>
        <div className="w-full border flex flex-row h-fit p-2 rounded-md">
          <div className="flex flex-col w-4/5 h-[78vh] border rounded-md overflow-hidden">
            <ReactPlayer
              url={savedClass?.vidUrl || classItem?.vidUrl}
              playing={false}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
          <div className="flex w-1/5 flex-col">
            <div className="px-2 w-full mt-0 h-full">
              <span className="text-sm opacity-80 font-semibold border-b">Attached Materials</span>
              <div className="grid grid-cols-1 h-full gap-4 px-3 py-1">
                {savedClass.pdfUrls?.map((pdf) => {
                  const name = pdf.courseName
                  const imageUrl = pdf.replace(/\.pdf$/, ".png");
                  return (
                    <a
                      href={pdf}
                      target="_blank"
                      key={pdf._id}
                      className="flex flex-col items-center space-y-0 border overflow-hidden p-0 rounded-md h-52 relative"
                    >
                      <img
                        src={imageUrl}
                        alt={pdf.courseName}
                        className="w-fit h-52"
                      />
                      <span className="text-center border font-semibold text-white opacity-0 hover:opacity-100 absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
                        {name}
                      </span>
                    </a>
                  );
                })}
                {/* {classItem.pdfUrls?.map((pdf) => {
                  const name = pdf.courseName
                  const imageUrl = pdf.replace(/\.pdf$/, ".png");
                  return (
                    <a
                      href={pdf}
                      target="_blank"
                      key={pdf._id}
                      className="flex flex-col items-center space-y-0 border overflow-hidden p-0 rounded-md h-52 relative"
                    >
                      <img
                        src={imageUrl}
                        alt={pdf.courseName}
                        className="w-fit h-52"
                      />
                      <span className="text-center border font-semibold text-white opacity-0 hover:opacity-100 absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
                        {name}
                      </span>
                    </a>
                  );
                })} */}

              </div>
            </div>
          </div>
        </div>

        <div className="w-3/5 px-0">
          <div className="w-full flex-col gap-5">
            <div className="flex flex-row w-full justify-between items-center">
              <div className="flex gap-4 py-2">
                <span className="text-gray-300 bg-blue-900 font-semibold flex justify-center items-center border p-2 rounded-md">Start: {formatDateTime(new Date(savedClass.timeOfSubject))}</span>
                <span className="text-gray-300 bg-blue-900 font-semibold flex justify-center items-center border p-2 rounded-md">End: {calculateEndTime(new Date(savedClass.timeOfSubject))}</span>

                <button
                  onClick={exitClass}
                  className="bg-red-700 outline-none mt-0 hover:bg-red-800 font-semibold w-fit text-white transition duration-300 ease-in-out">Exit Class</button>
              </div>
            </div>
          </div>
        </div>

      </div>}
    </div>
  );
}

export default ClassSession;
