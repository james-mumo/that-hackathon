import React, { useState, useEffect } from "react";
import useFetchByCategory from "./useFetchByCategory.js";
import axios from "axios";
import ReactPlayer from "react-player";
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";

function ContentUpload() {
  const [category, setCategory] = useState('All');
  const { videos, materials, isLoading, error } = useFetchByCategory();

  const [byMeVideo, setByMeVideos] = useState([])
  const [byMePdfs, setByMePdfs] = useState([])
  const [isLogin, setIsLogin] = useState(true);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userData"));
    const userID = String(item?._id)
    const filteredByMeVideos = videos.filter((item) =>
      item.uploaderName === userID
    );
    const filteredByMePdfs = materials.filter((item) =>
      item.uploaderName === userID
    );
    setByMeVideos(filteredByMeVideos)
    setByMePdfs(filteredByMePdfs)
  }, [category, materials, videos]);


  return (
    <div className="flex flex-col w-full h-[90vh] pt-2">
      <span className="flex items-center mb-1">
        <hr className="border-t border-slate-400 mx-1 w-4" />
        <span className="text-primary text-xl italic md:text-xl font-semibold">
          Upload Study Materials
        </span>
        <hr className="border-t border-slate-400 mx-1 flex-grow" />
      </span>
      <div className="flex h-[85vh]">
        <div className="flex flex-col w-2/3 h-[85vh] rounded-md overflow-y-scroll p-2 gap-3">
          <PdfUpload />
          <VideoUpload />
        </div>
        <div className="flex w-1/3 bg-gray-900 rounded-md border overflow-hidden my-2 mr-2">
          <div className="flex w-full flex-col">
            <span className="p-2 bg-slate-950 px-4 justify-between w-full flex items-center">
              <span className="font-semibold">Materials</span>
              <select
                name="category"
                id="category"
                value={category}
                onChange={handleCategoryChange}
                className="px-3 border border-slate-950 rounded-md h-10 bg-slate-800 pr-2"
              >
                <option value="All">All</option>
                <option value="byMe">By Me</option>
              </select>
            </span>
            <div className="h-full overflow-y-scroll p-2">
              {isLoading ? (
                <p><CircularProgress /></p>
              ) : error ? (
                <p>Error: {error.message}</p>
              ) : (
                category === "All" ? (
                  <>
                    <div className="w-full grid grid-cols-3 gap-3 px-2 overflow-y-scroll mb-1">
                      {/* Handle loading or error state */}
                      {isLoading && <p><CircularProgress /></p>}
                      {error && <p className="font-semibold text-white">Error: {error.message}</p>}

                      {/* Render materials fetched using the custom hook */}
                      {!isLoading && !error && materials.length > 0 ? (
                        materials
                          .filter((pdf) => pdf.materialType === "pdf") // Filter by materialType
                          .map((pdf) => {
                            const imageUrl = pdf.url.replace(/\.pdf$/, ".png");
                            return (
                              <a href={pdf.url} target="_blank"
                                key={pdf._id}
                                className="flex flex-col items-center space-y-0 border overflow-hidden p-0 rounded-md h-52 relative"
                              >
                                {/* Render individual PDF */}
                                <div className="text-center">
                                  <div>
                                    <img
                                      src={imageUrl}
                                      alt={pdf.courseName}
                                      className="w-full h-52"
                                    />
                                  </div>
                                </div>
                                <span className="text-center flex-col font-semibold text-white opacity-0 hover:opacity-100 absolute inset-0 flex text-md justify-center items-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
                                  {pdf.itemName} <span className="text-sm text-gray-300 italic">{pdf.courseName}</span>
                                </span>
                              </a>
                            );
                          })
                      ) : (
                        <span className="w-full font-semibold">No Pdf Materials Uploaded</span>
                      )}
                    </div>
                    {!isLoading && !error && videos.length > 0 ? (
                      videos.map((video) => (
                        <div
                          key={video._id}
                          className="flex my-2 flex-col items-center space-y-0 border overflow-hidden h-[270px] p-0 rounded-sm relative bg-slate-950"
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
                    ) :
                      (
                        <span className="w-full font-semibold">No Video Materials Uploaded</span>
                      )
                    }
                  </>
                ) : (
                  <>
                    <div className="w-full grid grid-cols-3 gap-3 px-2 overflow-y-scroll mb-1">
                      {
                        byMePdfs.length > 0 ? (
                          byMePdfs
                            .filter((pdf) => pdf.materialType === "pdf") // Filter by materialType
                            .map((pdf) => {
                              const imageUrl = pdf.url.replace(/\.pdf$/, ".png");
                              return (
                                <a href={pdf.url} target="_blank"
                                  key={pdf._id}
                                  className="flex flex-col items-center space-y-2 border overflow-hidden p-0 rounded-md h-52 relative"
                                >
                                  {/* Render individual PDF */}
                                  <div className="text-center">
                                    <div>
                                      <img
                                        src={imageUrl}
                                        alt={pdf.courseName}
                                        className="w-full h-52"
                                      />
                                    </div>
                                  </div>
                                  <span className="text-center flex-col font-semibold text-white opacity-0 hover:opacity-100 absolute inset-0 flex text-md justify-center items-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
                                    {pdf.itemName} <span className="text-sm text-gray-300 italic">{pdf.courseName}</span>
                                  </span>

                                  {/* You can display other fields here, e.g., courseType, dateUploaded, uploaderName */}
                                  <div className="text-center">Course Type: {pdf.courseType}</div>
                                  <div className="text-center">Date Uploaded: {pdf.dateUploaded}</div>
                                  <div className="text-center">Uploader: {pdf.uploaderName}</div>
                                </a>
                              );
                            })
                        ) : (
                          <span className="w-full font-semibold">No Pdf Materials Uploaded By You</span>
                        )
                      }</div>
                    {byMeVideo.length > 0 ? (
                      byMeVideo.map((video) => (
                        <div
                          key={video._id}
                          className="flex my-2 flex-col items-center space-y-0 border overflow-hidden h-[270px] p-0 rounded-sm relative bg-slate-950"
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
                    ) : (<>
                      <span className="w-full font-semibold">No Video Materials Uploaded By You</span>
                    </>)}
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function PdfUpload() {
  const [courseName, setCourseName] = useState("");
  const [contentType, setContentType] = useState("study");
  const [files, setFiles] = useState([]);
  const [uploaderName, setUploaderName] = useState("");
  const [itemName, setItemName] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userData"));
    setUploaderName(item?._id);
  }, [uploaderName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("contentType", contentType);
    formData.append("uploaderName", uploaderName);
    formData.append("itemName", itemName);

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

      setIsLoading(false)
      toast.success("Course Materials successfully")
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
    <div className="relative container mx-auto w-full rounded-md border bg-gray-900 p-2">
      <form
        onSubmit={handleSubmit}
        className="shadow-md rounded px-8 pt-4 pb-4 mb-4"
      >
        {isLoading && <div className="absolute h-full w-full flex justify-center items-center"><CircularProgress /></div>}

        <h4 className="font-semibold">Upload Pdf(s)</h4>
        <div className="flex gap-2 w-full my-1">
          <div className="w-full">
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Course Name
            </label>
            <select
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
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
              <option value="Bachelor of Arts in Peace Studies and Conflict Resolution">Bachelor of Arts in Peace Studies and Conflict Resolution</option>
              <option value="Bachelor of Arts in Public Administration">Bachelor of Arts in Public Administration</option>
              <option value="Bachelor of Science in Public Health">Bachelor of Science in Public Health</option>
              <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
              <option value="Bachelor of Public Health">Bachelor of Public Health</option>
              <option value="Bachelor of Arts in Arabic Language">Bachelor of Arts in Arabic Language</option>
              <option value="Bachelor of Arts in Community Development">Bachelor of Arts in Community Development</option>
              <option value="Bachelor of Arts in Criminology and Security Management">Bachelor of Arts in Criminology and Security Management</option>
              <option value="Bachelor of Arts in Development Studies">Bachelor of Arts in Development Studies</option>
              <option value="Bachelor of Arts in Film and Animation Studies">Bachelor of Arts in Film and Animation Studies</option>
              <option value="Bachelor of Arts in International Relations">Bachelor of Arts in International Relations</option>
              <option value="Bachelor of Arts in Justice and Security Studies">Bachelor of Arts in Justice and Security Studies</option>
              <option value="Bachelor of Arts in Mass Media and Communication">Bachelor of Arts in Mass Media and Communication</option>
              <option value="Bachelor of Arts in Peace Studies and Conflict Resolution">Bachelor of Arts in Peace Studies and Conflict Resolution</option>
              <option value="Bachelor of Arts in Public Administration">Bachelor of Arts in Public Administration</option>
              <option value="Bachelor of Arts in Public Administration and Governance">Bachelor of Arts in Public Administration and Governance</option>
              <option value="Bachelor of Arts in Sociology">Bachelor of Arts in Sociology</option>
              <option value="Bachelor of Arts in Sociology and Development">Bachelor of Arts in Sociology and Development</option>
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
          <div className="w-full">
            <label className="block text-gray-400 text-sm font-bold mb-2">
              Content Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            >
              <option value="study">Study</option>
              <option value="coursework">Course Work</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Item Name
          </label>
          <input
            type="text"
            value={itemName}
            required
            placeholder="Enter Item Name"
            onChange={(e) => setItemName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
          />
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
            onChange={handleFileChange}
            className="w-full border"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 text-sm font-bold mb-2">
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
            className="bg-gray-700 hover:bg-gray-800 font-semibold w-full text-white transition duration-300 ease-in-out"
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
  const [itemName, setItemName] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userData"));
    // setUploaderName(item.fullName);
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

      setIsLoading(true)
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("courseName", courseName);
      formData.append("courseType", contentType);
      formData.append("uploaderName", uploaderName);
      formData.append("itemName", itemName);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/upload/video`,
        formData
      );
      if (response.data.success) {
        setIsLoading(false)
        toast.success("File uploaded successfully.");
        console.log("File URL:", response.data.url);
      } else {
        setIsLoading(false)
        toast.error("An Error Occurred");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(error.response?.data?.message);
      setIsLoading(false)
    }
  };

  return (
    <div className="w-full relative border bg-gray-900 h-full rounded-md px-8 pt-6 pb-8 mb-4">
      <h4 className="font-semibold">Upload a Video</h4>

      {isLoading && <div className="absolute h-full w-full flex justify-center items-center"><CircularProgress /></div>}

      <div className="flex gap-2 w-full my-1">
        <div className="w-full">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Course Name
          </label>
          <select
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
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
            <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
            <option value="Bachelor of Arts in Criminology and Security Management">Bachelor of Arts in Criminology and Security Management</option>
            <option value="Bachelor of Arts in Development Studies">Bachelor of Arts in Development Studies</option>
            <option value="Bachelor of Arts in Film and Animation Studies">Bachelor of Arts in Film and Animation Studies</option>
            <option value="Bachelor of Arts in International Relations">Bachelor of Arts in International Relations</option>
            <option value="Bachelor of Arts in Justice and Security Studies">Bachelor of Arts in Justice and Security Studies</option>
            <option value="Bachelor of Arts in Mass Media and Communication">Bachelor of Arts in Mass Media and Communication</option>
            <option value="Bachelor of Arts in Peace Studies and Conflict Resolution">Bachelor of Arts in Peace Studies and Conflict Resolution</option>
            <option value="Bachelor of Arts in Public Administration">Bachelor of Arts in Public Administration</option>
            <option value="Bachelor of Arts in Public Administration and Governance">Bachelor of Arts in Public Administration and Governance</option>
            <option value="Bachelor of Arts in Sociology">Bachelor of Arts in Sociology</option>
            <option value="Bachelor of Arts in Sociology and Development">Bachelor of Arts in Sociology and Development</option>
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
        <div className="w-full">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Content Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
          >
            <option value="study">Study</option>
            <option value="coursework">Course Work</option>
          </select>
        </div>
      </div>
      <div className="w-full">
        <label className="block text-gray-400 text-sm font-bold mb-2">
          Item Name
        </label>
        <input
          type="text"
          value={itemName}
          required
          placeholder="Enter Item Name"
          onChange={(e) => setItemName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex flex-col mt-2">
        <label className="block text-gray-400 text-sm font-bold">
          Choose File
        </label>
        <input type="file" accept="video/*" onChange={handleFileChange} />
      </div>
      <div className="flex w-full justify-center items-center mt-2">
        <button className="bg-gray-700 hover:bg-gray-800 font-semibold w-full text-white transition duration-300 ease-in-out" onClick={uploadFile}>Upload</button>
      </div>
    </div>
  );
}

export default ContentUpload;
