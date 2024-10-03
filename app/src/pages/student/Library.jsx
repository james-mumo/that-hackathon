import React, { useState, useEffect } from "react";
import kenya from "../../assets/kenyaa.png";
import SearchIcon from "@mui/icons-material/Search";
import useGoogleBooks from "./customHooks/useGoogleBooks";
import useFetchContent from "./customHooks/useFetchMaterials";
import ReactPlayer from 'react-player';
import { Worker } from "@react-pdf-viewer/core";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import useFetchByCategory from "../tutor/useFetchByCategory";



function Library() {
  const [searchQuery, setSearchQuery] = useState("Java");
  const { data: bookData, isLoading } = useGoogleBooks(searchQuery);


  const [contentType, setContentType] = useState("All");
  const [userId, setUserId] = useState('')

  const [isMaterialsLoading, setIsMaterialsLoading] = useState(false);

  const [category, setCategory] = useState('All');
  const { videos, materials, error } = useFetchByCategory();

  const [byMeVideo, setByMeVideos] = useState([])
  const [byMePdfs, setByMePdfs] = useState([])
  const [isLogin, setIsLogin] = useState(true);

  const handleCategoryChange = (e) => {
    setContentType(e.target.value);
  };

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("userData"));
    const userID = item?.courseName
    console.log(materials)
    const filteredByMePdfs = materials.filter((item) =>
      item.courseName === userID
    );
    setByMePdfs(filteredByMePdfs)
    console.log(filteredByMePdfs)
  }, [contentType, materials, videos]);



  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileUrl, setFileUrl] = useState("https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf");

  const openPdfViewerModal = (url) => {
    setFileUrl(url);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false)
  }


  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="flex w-full gap-2 h-screen relative">
      <div className="w-3/5 bg-slate-700 flex flex-col m-1 p-1 rounded-md overflow-hidden gap-2">
        <div className="h-14 flex flex-row gap-5 justify-evenly items-center p-3 bg-slate-950">
          <div className="flex flex-1 justify-start items-center ">
            <span className="flex gap-2 justify-start items-center font-semibold text-lg">
              <img src={kenya} alt="" className="w-12 h-12 " />
              Books/CourseWork
            </span>
          </div>

          <div className="flex flex-row flex-2 justify-center items-center px-2">
            <select
              name="type"
              id="type"
              value={contentType}
              onChange={handleCategoryChange}
              className="px-3 border border-slate-950 rounded-md h-10 bg-slate-800 "
            >
              <option value="All">All</option>
              <option value="Course">Your Course</option>
            </select>
          </div>

        </div>

        <div className="w-full grid grid-cols-4 gap-3 px-2 overflow-y-scroll mb-1">
          {/* Handle loading or error state */}
          {isMaterialsLoading && <p><CircularProgress /></p>}
          {error && <p className="font-semibold text-white">Error: {error.message}</p>}
          {/* Render materials fetched using the custom hook */}
          {!isMaterialsLoading && !error && materials.length > 0 ? (

            contentType === "All" ? (
              materials
                .filter((pdf) => pdf.materialType === "pdf") // Filter by materialType
                .map((pdf) => {
                  const imageUrl = pdf.url.replace(/\.pdf$/, ".png");
                  return (
                    <div
                      key={pdf._id}
                      onClick={() => openPdfViewerModal(pdf.url)}
                      className="flex flex-col items-center space-y-0 border overflow-hidden p-0 rounded-md h-52 relative"
                    >
                      {/* Render individual PDF */}
                      <div className="text-center">
                        <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                          <img
                            src={imageUrl}
                            alt={pdf.courseName}
                            className="w-fit h-52"
                          />
                        </a>
                      </div>
                      <span className="text-center flex-col font-semibold text-white opacity-0 hover:opacity-100 absolute inset-0 flex text-md justify-center items-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
                        {pdf.itemName} <span className="text-sm text-gray-300 italic">{pdf.courseName}</span>
                      </span>

                      {/* You can display other fields here, e.g., courseType, dateUploaded, uploaderName */}
                      <div className="text-center">Course Type: {pdf.courseType}</div>
                      <div className="text-center">Date Uploaded: {pdf.dateUploaded}</div>
                      <div className="text-center">Uploader: {pdf.uploaderName}</div>
                    </div>
                  );
                })) : (
              byMePdfs.length > 0 ?
                (byMePdfs
                  .filter((pdf) => pdf.materialType === "pdf") // Filter by materialType
                  .map((pdf) => {
                    const imageUrl = pdf.url.replace(/\.pdf$/, ".png");
                    return (
                      <div
                        key={pdf._id}
                        onClick={() => openPdfViewerModal(pdf.url)}
                        className="flex flex-col items-center space-y-0 border overflow-hidden p-0 rounded-md h-52 relative"
                      >
                        {/* Render individual PDF */}
                        <div className="text-center">
                          <a href={pdf.url} target="_blank" rel="noopener noreferrer">
                            <img
                              src={imageUrl}
                              alt={pdf.courseName}
                              className="w-fit h-52"
                            />
                          </a>
                        </div>
                        <span className="text-center flex-col font-semibold text-white opacity-0 hover:opacity-100 absolute inset-0 flex text-md justify-center items-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
                          {pdf.itemName} <span className="text-sm text-gray-300 italic">{pdf.courseName}</span>
                        </span>

                        {/* You can display other fields here, e.g., courseType, dateUploaded, uploaderName */}
                        <div className="text-center">Course Type: {pdf.courseType}</div>
                        <div className="text-center">Date Uploaded: {pdf.dateUploaded}</div>
                        <div className="text-center">Uploader: {pdf.uploaderName}</div>
                      </div>
                    );
                  })) : (
                  <>
                    <span>No Items Based On Your Course</span>
                  </>
                )
            )
          ) : (
            <>
              <span className="w-full font-semibold">No Items</span>
            </>
          )}




        </div>
      </div>


      <div className="flex flex-col w-2/5 bg-slate-800 rounded-md p-1 m-1">

        <div className="h-14 flex flex-row gap-5 justify-evenly items-center p-3 bg-slate-950">
          <span className="flex flex-row flex-1 justify-start items-center px-2 font-semibold">
            E-Lib
          </span>

          <div className="flex flex-row flex-1 justify-center items-center px-2">
            <select
              name="category"
              id="category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 border border-slate-950 rounded-md h-10 bg-slate-800 "
            >
              <option value="Java">All</option>
              <option value="climate">Climate</option>
              <option value="oceans">Oceans</option>
              <option value="kenya">Kenya</option>
            </select>
          </div>

          <div className="ml-2 flex flex-1 justify-center items-center bg-slate-800 rounded-md border border-slate-950">

            <input
              type="search"
              name="search"
              id=""
              value={searchQuery}
              onChange={handleChange}
              className="p-2 outline-none rounded-sm h-10 flex-1"
              placeholder="Search..."
            />
            <SearchIcon className="h-12 w-12 m-2" />
          </div>

        </div>



        <div className="w-full grid grid-cols-3 gap-4 p-2 overflow-y-scroll">
          {isLoading ? (
            <p>Loading...</p>
          ) : bookData && bookData.items ? (
            bookData.items.map((item) => (
              <a target="_blank" href={item.volumeInfo.previewLink} key={item.id} className="flex flex-col items-center space-y-0 border overflow-hidden p-0 rounded-md h-52 relative">
                {item.volumeInfo.imageLinks && (
                  <img
                    src={item.volumeInfo.imageLinks.thumbnail}
                    alt="Thumbnail"
                    className="w-full h-52"
                  />
                )}
                <span className="text-center font-semibold text-white opacity-0 hover:opacity-100 absolute inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 transition-opacity duration-300">
                  {item.volumeInfo.title}
                </span>
              </a>

            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>

      </div>

      {isModalOpen && (
        <div className="absolute w-full bg-[#101c3b94] flex justify-center items-center h-screen overflow-y-scroll">
          <div className="pdf-viewer-content w-fit flex flex-col justify-end items-end gap-3">
            <button className="close-button bg-red-600 w-fit border h-8 flex items-center justify-end" onClick={() => onClose()}>
              Close
            </button>
            <div className="flex w-[450px] h-[550px]">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.14.305/build/pdf.worker.min.js" >
                <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
              </Worker>
            </div>
          </div>
        </div>
      )}
    </div >
  );
}

export default Library;
