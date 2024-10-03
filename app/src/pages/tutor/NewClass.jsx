import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import AddSchedule from "./AddSchedule";
import kenya from "../../assets/kenyaa.png";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

function NewClass() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [lectureTime, setLectureTime] = useState();
  const [contentType, setContentType] = useState("coursework");
  const [uploaderName, setUploaderName] = useState("");
  const [uploaderId, setUploaderId] = useState("");
  const [vidUrl, setVidUrl] = useState("");
  const [timeOfSubject, setTimeOfSubject] = useState("");
  const [pdfUrls, setPdfUrls] = useState("");
  const [attendance, setViewAttendance] = useState(false)
  const [classesByme, setClassesByMe] = useState("")
  const [files, setFiles] = useState([]);
  const [newClass, setNewClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userData"));
    setUploaderName(item?.fullname);
  }, [])

  console.log(uploaderName)

  const fethMyClasses = async () => {
    const item = JSON.parse(localStorage.getItem("userData"));
    setUploaderId(item?._id)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/class/id/${uploaderId}`
      );
      console.log(response.data?.fetchedClasses);
      setClassesByMe(response.data?.fetchedClasses)



    } catch (error) {
      console.error(error.response.data.error);
    }

  }

  console.log(classesByme)

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userData"));
    setUploaderName(item?.fullname);
    fethMyClasses()
  }, [uploaderName]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    const storedClassItem = localStorage.getItem("classData");

    if (storedClassItem) {
      const storedClassData = JSON.parse(storedClassItem);
      setVidUrl(storedClassData.vidUrl);
      setNewClass(storedClassData);
      console.log(storedClassData)
    } else {
      setVidUrl("");
    }
  }, []);

  const uploadFile = async () => {
    setIsLoading(true)
    try {
      if (!selectedFile) {
        alert("Please select a video file to upload.");
        setIsLoading(false)
        return;
      }

      const pdfData = new FormData();
      pdfData.append("courseName", courseName);
      pdfData.append("contentType", contentType);
      pdfData.append("uploaderName", uploaderName);
      pdfData.append("itemName", courseName);

      for (const file of files) {
        pdfData.append("files", file);
      }

      const pdfs_added = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/upload/pdf`,
        pdfData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      const formData = new FormData();
      formData.append("courseName", courseName);
      formData.append("lectureName", lectureName); // Include lectureName
      formData.append("courseLecturer", uploaderName);
      formData.append("lectureTime", lectureTime); // Include lectureTime
      formData.append("courseType", lectureName);
      //   video file
      formData.append("file", selectedFile);

      console.log(pdfData, formData)

      if (pdfs_added?.data?.pdfUrls && Array.isArray(pdfs_added.data.pdfUrls)) {
        pdfs_added.data.pdfUrls.forEach((pdfUrl) => {
          formData.append("pdfUrls", pdfUrl);
        });
      } else {
        formData.append("pdfUrls", pdfs_added?.data?.pdfUrls);
      }

      //   console.log(uploaderName);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/class/video`,
        formData
      );

      if (response.data.success) {
        toast.success("File uploaded successfully.");
        console.log("File URL:", response.data.class);

        localStorage.setItem("classData", JSON.stringify(response.data.class));

        const storedClassItem = localStorage.getItem("classData");

        const storedClassData = JSON.parse(storedClassItem);
        setVidUrl(storedClassData.vidUrl || response?.data?.class?.vidUrl);


        setIsLoading(false)
        toast.success("Class Added Successfully");

      } else {
        setIsLoading(false)
        toast.error("Something Went Wrong.");

      }
    } catch (error) {
      setIsLoading(false)
      toast.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadFile();
  };

  const handlePdfFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

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

  const deleteClass = () => {
    localStorage.removeItem("classData");
    window.location.reload();
  };

  const makeNewClass = () => {
    localStorage.removeItem("classData");
    window.location.reload();
  }

  const viewClass = () => {

  }

  return (
    <div className="flex relative flex-col w-full h-screen p-2 bg">

      <span className="flex items-center mb-2">
        <hr className="border-t border-slate-400 mx-1 w-4" />
        <span className="text-primary text-xl italic md:text-xl font-semibold">
          Create A Recorded Class
        </span>
        <hr className="border-t border-slate-400 mx-1 flex-grow" />
      </span>
      {isLoading && <div className="absolute h-full w-full flex justify-center items-center"><CircularProgress /></div>}
      <div className="flex w-full h-[82vh] items-start justify-center gap-3">
        {!newClass && (<div className="w-full h-[82vh] overflow-y-scroll flex-col flex">
          <form className="w-full h-full border bg-slate-900 rounded-md overflow-y-scroll p-3" onSubmit={handleSubmit}>
            <span className="font-semibold">Create Class</span>
            <div className="flex w-full gap-3">

              <div className="w-full">
                <label className="block text-gray-100 text-sm font-bold mb-2">
                  Course Name
                </label>
                <select
                  type="text"
                  required
                  placeholder="Enter course name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  <option value="Bachelor of Arts in Arabic Language">Bachelor of Arts in Arabic Language</option>
                  <option value="Bachelor of Arts in Community Development">Bachelor of Arts in Community Development</option>
                  <option value="Bachelor of Arts in Criminology and Security Management">Bachelor of Arts in Criminology and Security Management</option>
                  <option value="Bachelor of Arts in Justice and Security Studies">Bachelor of Arts in Justice and Security Studies</option>
                  <option value="Bachelor of Arts in Film and Animation Studies">Bachelor of Arts in Film and Animation Studies</option>
                  <option value="Bachelor of Arts in Public Administration">Bachelor of Arts in Public Administration</option>
                  <option value="Bachelor of Science in Public Health">Bachelor of Science in Public Health</option>
                  <option value="Bachelor of Arts in Peace Studies and Conflict Resolution">Bachelor of Arts in Peace Studies and Conflict Resolution</option>
                  <option value="Bachelor of Public Health">Bachelor of Public Health</option>
                  <option value="Bachelor of Arts in Arabic Language">Bachelor of Arts in Arabic Language</option>
                  <option value="Bachelor of Arts in Community Development">Bachelor of Arts in Community Development</option>
                  <option value="Bachelor of Arts in Criminology and Security Management">Bachelor of Arts in Criminology and Security Management</option>
                  <option value="Bachelor of Arts in Development Studies">Bachelor of Arts in Development Studies</option>
                  <option value="Bachelor of Arts in Film and Animation Studies">Bachelor of Arts in Film and Animation Studies</option>
                  <option value="Bachelor of Arts in International Relations">Bachelor of Arts in International Relations</option>
                  <option value="Bachelor of Arts in Justice and Security Studies">Bachelor of Arts in Justice and Security Studies</option>
                  <option value="Bachelor of Arts in Arabic Language">Bachelor of Arts in Arabic Language</option>
                  <option value="Bachelor of Arts in Mass Media and Communication">Bachelor of Arts in Mass Media and Communication</option>
                  <option value="Bachelor of Arts in Peace Studies and Conflict Resolution">Bachelor of Arts in Peace Studies and Conflict Resolution</option>
                  <option value="Bachelor of Arts in Public Administration">Bachelor of Arts in Public Administration</option>
                  <option value="Bachelor of Arts in Public Administration and Governance">Bachelor of Arts in Public Administration and Governance</option>
                  <option value="Bachelor of Arts in Sociology">Bachelor of Arts in Sociology</option>
                  <option value="Bachelor of Arts in Sociology and Development">Bachelor of Arts in Sociology and Development</option>
                  <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
                  <option value="Bachelor of Biomedical Laboratory Science">Bachelor of Biomedical Laboratory Science</option>
                  <option value="Bachelor of Business Information Technology">Bachelor of Business Information Technology</option>
                  <option value="Bachelor of Business Management">Bachelor of Business Management</option>
                  <option value="Bachelor of Commerce">Bachelor of Commerce</option>
                  <option value="Bachelor of Counselling">Bachelor of Counselling</option>
                  <option value="Bachelor of Economics">Bachelor of Economics</option>
                  <option value="Bachelor of Economics and Finance">Bachelor of Economics and Finance</option>
                  <option value="Bachelor of Economics and Statistics">Bachelor of Economics and Statistics</option>
                  <option value="Bachelor of Education in Early Childhood Studies">Bachelor of Education in Early Childhood Studies</option>
                  <option value="Bachelor of Education in Special Needs Education (Primary Option)">Bachelor of Education in Special Needs Education (Primary Option)</option>
                  <option value="Bachelor of Education (Arts)">Bachelor of Education (Arts)</option>
                  <option value="Bachelor of Education (Primary Education)">Bachelor of Education (Primary Education)</option>
                  <option value="Bachelor of Education (Primary Option)">Bachelor of Education (Primary Option)</option>
                  <option value="Bachelor of Education (Science)">Bachelor of Education (Science)</option>
                  <option value="Bachelor of Education in Special Needs Education (Secondary Option)">Bachelor of Education in Special Needs Education (Secondary Option)</option>
                  <option value="Bachelor of Laws">Bachelor of Laws</option>
                  <option value="Bachelor of Management and Office Administration">Bachelor of Management and Office Administration</option>
                  <option value="Bachelor of Medicine and Surgery">Bachelor of Medicine and Surgery</option>
                  <option value="Bachelor of Pharmacy">Bachelor of Pharmacy</option>
                  <option value="Bachelor of Procurement">Bachelor of Procurement</option>
                  <option value="Bachelor of Public Health">Bachelor of Public Health</option>
                  <option value="Bachelor of Science in Actuarial Science">Bachelor of Science in Actuarial Science</option>
                  <option value="Bachelor of Arts in International Relations">Bachelor of Arts in International Relations</option>
                  <option value="Bachelor of Arts in Public Administration and Governance">Bachelor of Arts in Public Administration and Governance</option>
                  <option value="Bachelor of Arts in Mass Media and Communication">Bachelor of Arts in Mass Media and Communication</option>
                  <option value="Bachelor of Arts in Sociology">Bachelor of Arts in Sociology</option>

                </select>
              </div>

              <div className="mb-4 w-full">
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Lecture Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter unit name"
                  className="shadow appearance-none p-3 border rounded-md w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                  value={lectureName}
                  onChange={(e) => setLectureName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-center items-center gap-3 w-full">
              <div className=" w-full">
                <label className="block text-gray-400 text-sm font-bold mb-2">
                  Lecturer Time
                </label>
                <input
                  type="datetime-local"
                  value={lectureTime}
                  onChange={(e) => setLectureTime(e.target.value)} // Set lectureTime state
                  id="localDateTime"
                  name="localDateTime"
                  min={new Date().toISOString().split("T")[0] + "T00:00"}
                  max="2023-11-20T23:59"
                  className="border rounded-md p-2 w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="block text-gray-400 text-sm font-bold mb-2">
                  Recorded Lecture
                </label>
                <input type="file" accept="video/*" onChange={handleFileChange}
                  className="border rounded-md w-full p-2" />
              </div>
            </div>

            <div className="my-4">
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Upload Files
              </label>
              <input
                type="file"
                multiple
                required
                accept=".pdf"
                onChange={handlePdfFileChange}
                className="w-full border"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 text-sm font-bold mb-2">
                Selected Files:
              </label>
              <ul className="list-disc pl-4">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>

            <button type="submit"
              className="bg-gray-700 mt-3 hover:bg-gray-800 font-semibold w-full text-white transition duration-300 ease-in-out">Upload</button>

            <div className="p-2 border mt-7 gap-3 w-full flex flex-col bg-gray-800">
              {classesByme && classesByme.map(cl => (
                <div className="p-2 rounded-md gap-2 flex w-full cursor-pointer flex-col bg-gray-900" key={cl._id} onClick={() => viewClass(cl)}>
                  <span className="font-semibold text-mg text-gray-300">{cl.courseName}</span>
                  <span className="font-semibold text-sm text-gray-400"> Unit: <span className="font-thin">{cl.lectureName} </span> </span>
                  <span className="font-semibold text-sm text-gray-400"> Time: <span className="font-thin">{Date(cl.dateCreated)} </span> </span>
                  <span className="font-semibold items-center flex text-sm text-gray-400"> Attendance: <span className="font-thin">{cl.attendance.length} </span> <span onClick={() => setViewAttendance(!attendance)} className="flex rounded-md px-3 bg-slate-700 ml-2 py-0">View</span> </span>
                  {/* <div className="flex flex-col border rounded-sm w-full">
                    <span> Attendance </span>
                    <hr />

                  </div> */}
                </div>

              ))}
            </div>
          </form>

        </div>
        )}

        {newClass && (
          <div className="w-full h-[82vh] bg-slate-900 overflow-hidden rounded-md flex flex-col overflow-y-auto p-2">
            <h2 className="text-2xl font-semibold">{newClass?.courseName}</h2>
            <span className="flex gap-3 justify-start items-center">
              <span className="text-gray-200 font-semibold">Lecture:  <span className="text-sm opacity-80 font-normal">{newClass.lectureName}</span></span>
              <span className="text-gray-200 font-semibold">Tutor : <span className="text-sm font-normal opacity-80">{newClass.courseLecturer}</span></span>
            </span>
            <div className="flex gap-1">
              <div className="w-4/5 border h-[75vh] p-2 rounded-md">
                <ReactPlayer
                  url={newClass.vidUrl}
                  playing={false}
                  controls={true}
                  width="100%"
                  height="100%"
                />
              </div>

              <div className="flex w-1/5 flex-col">
                <div className="border w-full mt-3">
                  <span className="text-sm opacity-80 font-semibold border-b">Attached Materials</span>
                  <div className="grid grid-cols-1 h-full gap-4 px-3 py-1">
                    {newClass.pdfUrls.map((pdf) => {
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

                  </div>
                </div>
              </div>
            </div>
            <div className="w-3/5 px-0">
              <div className="w-full flex-col gap-5">
                <div className="flex flex-row w-full justify-between items-center">
                  <div className="flex gap-4 py-2">
                    <span className="text-gray-300 bg-blue-900 font-semibold flex justify-center items-center border p-2 rounded-md">Start: {formatDateTime(new Date(newClass.timeOfSubject))}</span>
                    <span className="text-gray-300 bg-blue-900 font-semibold flex justify-center items-center border p-2 rounded-md">End: {calculateEndTime(new Date(newClass.timeOfSubject))}</span>

                    <button onClick={deleteClass}
                      className="bg-red-700 outline-none mt-0 hover:bg-red-800 font-semibold w-fit text-white transition duration-300 ease-in-out">Delete Class</button>
                    <button onClick={makeNewClass}
                      className="bg-green-700 outline-none mt-0 hover:bg-green-800 font-semibold w-fit text-white transition duration-300 ease-in-out">New Class</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        }

        <AddSchedule />
      </div >
    </div >
  );
}

export default NewClass;
