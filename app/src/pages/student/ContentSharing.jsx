import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player"; // Import ReactPlayer
import useFetchContent from "./customHooks/useFetchMaterials";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

function ContentSharing() {
  const { videos, materials, isMaterialsLoading, error } = useFetchContent();
  console.log(videos)
  return (
    <div className="flex flex-col w-full h-screen p-2 bg">
      <span className="flex items-center mb-2">
        <hr className="border-t border-slate-400 mx-1 w-4" />
        <span className="text-primary text-xl italic md:text-xl font-semibold">
          Content Sharing
        </span>
        <hr className="border-t border-slate-400 mx-1 flex-grow" />
      </span>
      <div className="flex flex-row gap-3 h-fit">
        <div className="flex h-fit flex-col gap-3 w-1/2">
          <PdfUpload />
          <VideoUpload />
        </div>

        <div className="h-[87vh] rounded-md relative w-1/2">
          <div className="h-14 flex flex-row gap-5 justify-evenly items-center p-3 bg-slate-950">
            <span className="flex flex-row flex-1 justify-start items-center px-2 gap-3 font-semibold">
              <OndemandVideoIcon /> Video Coursework
            </span>
          </div>
          <div className="h-full p-2 border overflow-y-scroll grid grid-cols-2 gap-3">
            {!isMaterialsLoading && !error && videos.length > 0 ? (
              videos.map((video) => (
                <div
                  key={video._id}
                  className="flex flex-col items-center space-y-2 border overflow-hidden h-[290px] overflow-y-scroll p-0 rounded-md relative bg-slate-950"
                >
                  <ReactPlayer
                    url={video.url}
                    controls
                    width="100%"
                    height="220px"
                  />
                  <div className="text-md flex flex-col font-semibold cursor-pointer w-full justify-center items-center">
                    {video.itemName}
                    <span className="text-sm italic">{video.courseName}</span>
                  </div>
                </div>
              ))
            ) : (
              <span>No Vides Uploaded</span>
            )}</div>
        </div>
      </div >
    </div >
  );
}

function PdfUpload() {
  const [courseName, setCourseName] = useState("");
  const [contentType, setContentType] = useState("pdf");
  const [files, setFiles] = useState([]);

  const [uploaderName, setUploaderName] = useState("");

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userData"));
    setUploaderName(item?._id);
    console.log(uploaderName);
  }, [uploaderName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("contentType", contentType);
    formData.append("uploaderName", uploaderName);

    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/upload/pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Course Materials successfully:", response.data);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  return (
    <div className="flex-col  bg-slate-950 p-3 rounded-md w-full flex">
      <form
        onSubmit={handleSubmit}
        className=""
      >
        <h2 className="font-semibold">Upload File(s)</h2>
        <div className="flex w-full gap-3 mb-2">
          <div className="flex-1">
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Course Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter course name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Content Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              <option value="study">Study</option>
              <option value="coursework">Course Work</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Upload Files
          </label>
          <input
            type="file"
            multiple
            required
            accept=".pdf"
            onChange={handleFileChange}
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
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-gray-700 hover:bg-gray-900 font-semibold w-full text-white transition duration-300 ease-in-out"
          >
            Add Item(s)
          </button>
        </div>
      </form>
    </div>
  );
}


function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [contentType, setContentType] = useState("study");
  const [uploaderName, setUploaderName] = useState("");

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userData"));
    setUploaderName(item?._id);
    console.log(uploaderName);
  }, [uploaderName]);


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    try {
      if (!selectedFile) {
        alert("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("courseName", courseName);
      formData.append("courseType", contentType);
      formData.append("uploaderName", uploaderName);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/upload/video`,
        formData
      );
      if (response.data.success) {
        alert("File uploaded successfully.");
        console.log("File URL:", response.data.url);
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="flex flex-col bg-slate-950 p-3 w-full rounded-md">
      <h2 className="font-semibold px-3">Upload Video</h2>
      <div className="flex w-full gap-3 bg-slate-950 px-3 rounded-md">
        <div className="mb-4 flex-1">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Course Name
          </label>
          <input
            type="text"
            required
            placeholder="Enter course name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="mb-4 flex-1">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Content Type
          </label>
          <select
            className="shadow appearance-none bg-gray-700 border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="study">Study</option>
            <option value="coursework">Course Work</option>
          </select>
        </div>
      </div>
      <div className="flex w-full px-3">
        <input type="file" accept="video/*" onChange={handleFileChange} />
      </div>
      <button className="bg-gray-700 hover:bg-gray-900 font-semibold w-full text-white transition duration-300 ease-in-out mt-3" onClick={uploadFile}>Upload</button>
    </div>
  );
}

export default ContentSharing;
