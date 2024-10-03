import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';

function AddExams() {
  const [examData, setExamData] = useState({
    uploaderName: "",
    courseName: "",
    examTime: "",
    examDuration: 0,
    questions: [],
    pdfUrls: [], lectureName: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadUploaderNameFromLocalStorage = () => {
    const itemLocal = localStorage.getItem("userData");
    const parsedItem = JSON.parse(itemLocal);
    console.log(parsedItem?.fullname);
    if (parsedItem?.fullname) {
      setExamData((prevState) => ({
        ...prevState,
        uploaderName: parsedItem.fullname,
      }));
    }
  };

  useEffect(() => {
    loadUploaderNameFromLocalStorage(); // Load uploaderName when the component mounts
  }, []);

  const [questionText, setQuestionText] = useState("");
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({
      ...examData,
      [name]: value,
    });
  };

  const handleAddQuestion = () => {

    if (questionText.trim() !== "") {
      setExamData({
        ...examData,
        questions: [...examData.questions, questionText],
      });
      setQuestionText("");
    }
  };

  const sendAttachments = async () => {
    try {
      const formData = new FormData();
      formData.append("courseName", examData.courseName);
      formData.append("contentType", "coursework");
      formData.append("uploaderName", examData.uploaderName);
      formData.append("itemName", "Exam Material");

      for (const file of files) {
        formData.append("files", file);
      }

      const pdfUrls = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/upload/pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return pdfUrls.data.pdfUrls; // Return the array of PDF URLs
    } catch (error) {
      console.log(error);
      return []; // Return an empty array if there's an error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const newPdfUrls = await sendAttachments();
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}api/exams/add`,
        { ...examData, pdfUrls: [...newPdfUrls] }
      );
      console.log("Exam details submitted:", response.data.message);
      setIsLoading(false)
      toast.success("Exam details submitted");
      setExamData({
        uploaderName: "",
        courseName: "",
        examTime: "",
        examDuration: 0,
        questions: [],
        pdfUrls: [], lectureName: ""
      })

    } catch (error) {
      console.error("Error submitting exam details:", error);
      setIsLoading(false)
      toast.error(error.response?.data?.message);
    }
  };


  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  return (
    <form onSubmit={handleSubmit} className="border relative p-4 shadow-md rounded-md bg-gray-900">
      {isLoading && <div className="absolute h-full w-full flex justify-center items-center"><CircularProgress /></div>}
      <h2 className="text-xl font-semibold mb-1">Create Exam</h2>

      <div className="flex gap-2">

        <div className="w-full mb-3">
          <label className="block text-gray-400 text-sm font-bold mb-1">
            Course Name
          </label>
          <select
            name="courseName"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
            value={examData.courseName}
            onChange={handleChange}
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
            <option value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</option>
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

        <div className="w-full mb-3">
          <label className="block text-gray-400 text-sm font-bold mb-1">
            Unit Name
          </label>
          <input
            type="text"
            name="lectureName"
            className="w-full p-2 border rounded-md"
            placeholder="Enter unit name"
            value={examData.lectureName}
            onChange={handleChange}
            required
          />
        </div>

      </div>

      <div className="flex gap-3 mb-1 w-full items-center">
        <div className="flex flex-col flex-1">
          <label className="block font-semibold">
            Exam Start Time:
          </label>
          <input
            type="datetime-local"
            name="examTime"
            className="w-full p-2 border rounded-md"
            placeholder="Enter exam start time (e.g., 9:00 AM)"
            value={examData.examTime}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0] + "T00:00"}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="block font-semibold">
            Exam Duration (minutes):
          </label>
          <input
            type="number"
            name="examDuration"
            className="w-full p-2 border rounded-md"
            placeholder="Enter exam duration (minutes)"
            value={examData.examDuration}
            onChange={handleChange}
            required
          />
        </div></div>
      <div className="my-3">
        <label className="block font-semibold">Questions:</label>
        <ul>
          {examData.questions.map((question, index) => (
            <li key={index} className="text-white mb-2">
              {question}
            </li>
          ))}
        </ul>
        <div className="flex gap-3 w-full items-center">
          <input
            type="text"
            className="w-full px-2 border rounded-md flex-1 outline-none h-10"
            placeholder="Enter a question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required={false}
          />
          <button
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex border gap-2 text-white px-2 rounded-md">
        <div className="my-1 border-r pr-2 pb-4">
          <label className="block text-white opacity-95 text-sm font-bold mb-1">
            Attach Files
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
        <div className="my-0">
          <label className="block text-white opacity-95 text-sm font-bold my-1">
            Selected Files:
          </label>
          <ul className="list-disc pl-4">
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      </div>



      <button
        type="submit"
        className="bg-gray-700 hover:bg-gray-800 font-semibold w-full text-white transition duration-300 ease-in-out mt-4"
      >
        Create Exam
      </button>
    </form>
  );
}

export default AddExams;
