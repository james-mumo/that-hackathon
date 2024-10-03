import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

function AddAnnouncement() {
  const [announcementData, setAnnouncementData] = useState({
    header: "",
    text: "",
    audience: "all",
    expiryTime: "",
    urgency: "low",
    uploaderName: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Function to load uploaderName from local storage
  const loadUploaderNameFromLocalStorage = () => {
    const itemLocal = localStorage.getItem("userData");
    const parsedItem = JSON.parse(itemLocal);

    if (parsedItem.fullname) {
      setAnnouncementData((prevState) => ({
        ...prevState,
        uploaderName: parsedItem.fullname,
      }));
    }
  };

  useEffect(() => {
    loadUploaderNameFromLocalStorage(); // Load uploaderName when the component mounts
  }, []); // Empty dependency array to ensure it only runs once

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUrgencyChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddAnnouncement = () => {
    setIsLoading(true)
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}api/announcements/add`,
        announcementData
      )
      .then((response) => {
        console.log("Announcement added:", response.data);
        setIsLoading(false)
        toast.success("Announcement added");
        setAnnouncementData({
          header: "",
          text: "",
          audience: "",
          expiryTime: "",
          urgency: "",
          uploaderName: "",
        });
      })
      .catch((error) => {
        console.error("Error adding announcement:", error);
        setIsLoading(false)
        toast.error(error?.response?.data?.message);

      });
  };

  return (
    <form
      onSubmit={handleAddAnnouncement} className="p-4 relative border rounded shadow-md bg-gray-900">
      {isLoading && <div className="absolute h-full w-full flex justify-center items-center"><CircularProgress /></div>}
      <h2 className="text-lg font-semibold mb-2">Add Announcement</h2>
      <div className="flex flex-1 flex-col mb-2">
        <label htmlFor="audience" className="block font-semibold">
          Announcement Header:
        </label>
        <input
          required
          type="text"
          name="header"
          placeholder="Enter announcement header"
          value={announcementData.header}
          onChange={handleInputChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div className="flex flex-1 flex-col mb-2">
        <label htmlFor="audience" className="block font-semibold">
          Announcement Text:
        </label>
        <textarea
          required
          type="text"
          name="text"
          placeholder="Enter announcement text"
          value={announcementData.text}
          onChange={handleInputChange}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div className="flex gap-2 w-full">
        <div className="flex flex-1 flex-col">
          <label htmlFor="audience" className="block font-semibold">
            Audience:
          </label>
          <select
            id="audience"
            name="audience"
            value={announcementData.audience}
            onChange={handleInputChange}
            className="border rounded p-2 w-full"
          >
            <option value="all">All</option>
            <option value="Bachelor of Arts in Arabic Language">Bachelor of Arts in Arabic Language</option>
            <option value="Bachelor of Arts in Community Development">Bachelor of Arts in Community Development</option>
            <option value="Bachelor of Arts in Criminology and Security Management">Bachelor of Arts in Criminology and Security Management</option>
            <option value="Bachelor of Arts in Justice and Security Studies">Bachelor of Arts in Justice and Security Studies</option>
            <option value="Bachelor of Arts in Film and Animation Studies">Bachelor of Arts in Film and Animation Studies</option>
            <option value="Bachelor of Arts in Public Administration">Bachelor of Arts in Public Administration</option>
            <option value="Bachelor of Science in Public Health">Bachelor of Science in Public Health</option>
            <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
            <option value="Bachelor of Arts in Peace Studies and Conflict Resolution">Bachelor of Arts in Peace Studies and Conflict Resolution</option>
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
        <div className="flex flex-1 flex-col">
          <label htmlFor="expiryTime" className="block font-semibold">
            Expiry Time:
          </label>
          <input
            required
            type="datetime-local"
            id="expiryTime"
            name="expiryTime"
            value={announcementData.expiryTime}
            onChange={handleInputChange}
            className="border rounded px-2 py-1 w-full"
            min={new Date().toISOString().split("T")[0] + "T00:00"}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <label htmlFor="urgency" className="block font-semibold">
            Urgency:
          </label>
          <select
            id="urgency"
            name="urgency"
            value={announcementData.urgency}
            onChange={handleUrgencyChange}
            className="border rounded p-2 w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

        </div>
      </div>


      <div>
        <button
          className="bg-gray-700 hover:bg-gray-800 font-semibold w-full text-white transition duration-300 ease-in-out mt-4"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default AddAnnouncement;
