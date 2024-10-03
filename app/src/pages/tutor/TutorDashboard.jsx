import React, { useEffect, useState } from "react";
import kenya from "../../assets/kenyaa.png";
import { Navigate } from "react-router-dom";
import axios from "axios";

function TutorDashboard() {

  const [classesByme, setClassesByMe] = useState(false)
  const [uploaderId, setUploaderId] = useState("");

  const fethMyClasses = async () => {
    const item = JSON.parse(localStorage.getItem("userData"));
    setUploaderId(item?._id)
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}api/class/id/${uploaderId}`
      );
      console.log(response.data?.fetchedClasses);

      setClassesByMe(response)
    } catch (error) {
      console.error(error.response.data.error);
    }

  }


  useEffect(() => {
    fethMyClasses()
  }, []);


  if (localStorage.getItem("userData")) {
    return (
      <div className="w-full flex p-3 h-[90vh] gap-3 border">
        <ProfileDiv />
        <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full border">
          <div className="border border-gray-300 p-4 text-center rounded-md">
            {classesByme.length}
            {classesByme > 0 ? classesByme.map(cl => (
              <div className="" key={cl._id}>
                <span>{cl.courseName}</span>
                <span>{cl.courseLecturer}</span>
                <span>{cl.attendance.length}</span>
              </div>
            )) : (
              <div className="">
                james
              </div>)
            }
          </div>
          <div className="border border-gray-300 p-4 text-center rounded-md">
            Placeholder 3
          </div>
          <div className="border border-gray-300 p-4 text-center rounded-md">
            Placeholder 4
          </div>
          <div className="border border-gray-300 p-4 text-center rounded-md">
            Placeholder 5
          </div>
          <div className="border border-gray-300 p-4 text-center rounded-md">
            Placeholder 6
          </div>
          <div className="border border-gray-300 p-4 text-center rounded-md">
            Placeholder 7
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/auth/" replace />;
  }
}

const ProfileDiv = () => {
  const [profImage, setProfImage] = useState("")
  // Define your initial state including the image
  const initialFormData = {
    email: "",
    password: "",
    fullname: "",
    phoneNumber: "",
    schoolOf: "",
    registrationNumber: "",
    typeOfEmployment: "",
    image: null, // Add image property to the initial state
  };

  // State to hold the form data
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData(parsedData);
    }
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // image update
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Update the FormData with the image if a new file is selected
    if (selectedFile) {
      const newFormData = new FormData();
      newFormData.append("image", selectedFile);
      newFormData.append("userId", formData?._id);

      // Merge the newFormData with the existing formData
      // for (const key in formData) {
      //   newFormData.append(key, formData[key]);
      // }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}api/upload`,
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("File uploaded successfully:", response.data);
        setProfImage(response.data.imageUrl)
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="border shadow-lg rounded-lg overflow-hidden w-1/3">
      <div className="px-4 py-2 bg-gray-900-100 border-b">
        <h2 className="text-lg font-semibold">Profile Information</h2>
      </div>
      <div className="px-4 py-3 flex flex-col">
        <img src={profImage || formData.image || kenya} alt="" className="rounded-full border " />
        {/*  */}
        {/*  */}
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Upload</button>
          {/*  */}
          {/*  */}
        </form>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={formData.email}
                onChange={(e) => formData.setEmail(e.target.value)}
              />
            ) : (
              formData.email
            )}
          </li>
          <li>
            <strong>Password:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={formData.password}
                onChange={(e) => formData.setPassword(e.target.value)}
              />
            ) : (
              "********"
            )}
          </li>
          <li>
            <strong>Full Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={formData.fullname}
                onChange={(e) => formData.setFullname(e.target.value)}
              />
            ) : (
              formData.fullname
            )}
          </li>
          <li>
            <strong>Phone Number:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => formData.setPhoneNumber(e.target.value)}
              />
            ) : (
              formData.phoneNumber
            )}
          </li>
          <li>
            <strong>School Of:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={formData.schoolOf}
                onChange={(e) => formData.setSchoolOf(e.target.value)}
              />
            ) : (
              formData.schoolOf
            )}
          </li>
          <li>
            <strong>Registration Number:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={formData.registrationNumber}
                onChange={(e) => formData.setRegistrationNumber(e.target.value)}
              />
            ) : (
              formData.registrationNumber
            )}
          </li>
          <li>
            <strong>Type of Employment:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                value={formData.typeOfEmployment}
                onChange={(e) => formData.setTypeOfEmployment(e.target.value)}
              />
            ) : (
              formData.typeOfEmployment
            )}
          </li>
        </ul>
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={handleEditClick}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
