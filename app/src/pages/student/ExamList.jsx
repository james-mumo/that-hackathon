import React, { useState, useEffect } from "react";
import axios from "axios";

const ExamList = () => {
  const [exams, setExams] = useState([]);
  const currentDateTime = new Date();

  useEffect(() => {
    // Fetch exam data from the API
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/exams`)
      .then((res) => {
        console.log(res)
        setExams(res.data.exams);
      })
      .catch((error) => {
        console.error("Error fetching exam data:", error);
      });
  }, []);

  const pendingExams = exams && exams.filter((exam) => {
    const examTime = new Date(exam.examTime);
    return examTime <= currentDateTime;
  });

  const upcomingExams = exams && exams.filter((exam) => {
    const examTime = new Date(exam.examTime);
    return examTime > currentDateTime;
  });

  const renderExams = (examArray) => {
    if (examArray.length === 0) {
      return <p>No exams</p>;
    }

    return examArray.map((exam) => (
      <div key={exam._id} className="border flex flex-col p-4 my-4 rounded-lg shadow-lg h-fit border-gray-400 bg-gray-500">
        <span className="text-xl mb-1 font-semibold">{exam.courseName}</span>
        <span className="text-xl mb-1 text-gray-300 font-semibold italic">{exam.lectureName}</span>
        <p className="text-gray-300"> Duration: {exam.examDuration} minutes</p>
        <p className="text-gray-300"> Time: {new Date(exam.examTime).toLocaleString()}</p>
        <p className="text-gray-300">Lecturer: {exam.uploaderName}</p>

        <div className="flex gap-3">
          <p className="text-gray-300">Questions: {exam.questions.length}</p>
          <p className="text-gray-300">Attachments: {exam.pdfUrls.length}</p>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={() => handleOpenExam(exam)}
        >
          Open
        </button>
      </div>

    ));
  };

  const [selectedExam, setSelectedExam] = useState();
  const [remainingTime, setRemainingTime] = useState(selectedExam?.examDuration * 60);

  useEffect(() => {
    if (remainingTime > 0) {
      const timerInterval = setInterval(() => {
        setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
      }, 1000); // 1000 milliseconds (1 second)

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [remainingTime]);

  // Convert remainingTime to hours, minutes, and seconds for display
  const hours = Math.floor(remainingTime / 60 / 60);
  const minutes = Math.floor((remainingTime / 60) % 60);
  const seconds = remainingTime % 60;

  // Function to handle changes in the form fields
  const handleOpenExam = (exam) => {
    console.log(exam)
    setSelectedExam(exam);
    setRemainingTime(exam?.examDuration * 60);
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Exam Submitted:", selectedExam);
  };

  const handleCloseModal = () => {
    setSelectedExam()
  }

  return (
    <div className="flex relative flex-col w-full h-screen">
      <div className="flex relative flex-col h-full w-full bg-slate-800 p-2 rounded-md">
        <span className="flex items-center mb-2">
          <hr className="border-t border-slate-400 mx-1 w-4" />
          <span className="text-primary text-xl italic md:text-xl font-semibold">
            Exams
          </span>
          <hr className="border-t border-slate-400 mx-1 flex-grow" />
        </span>
        <div className="flex h-full overflow-y-scroll">
          <div className="flex flex-row gap-2  w-4/5">
            <div className="flex flex-col w-1/2 p-2 bg-gray-900 rounded-md">
              <span className="w-full font-semibold pb-2">Upcoming Exams</span>
              <hr />
              <div className="h-full overflow-y-scroll mt-1 grid grid-cols-1 gap-2 px-2 rounded-md">
                {renderExams(upcomingExams)}
              </div>
            </div>
            <div className="flex flex-col w-1/2 p-2 bg-gray-900 rounded-md ">
              <span className="w-full font-semibold pb-2">Pending Exams</span>
              <hr />
              <div className="h-full overflow-y-scroll grid grid-cols-2 gap-2  px-2 rounded-md">
                {renderExams(pendingExams)}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/5 bg-gray-900 ml-2 rounded-md p-2">
            <span className="font-semibold">Results</span>
            <hr />
            <span>No exam submitted</span>
          </div>
        </div>
        {/*  */}

        {selectedExam && (
          <div className="w-full flex flex-col flex-1 border rounded-md h-screen absolute bg-[#06133db2] justify-center items-center">
            <div className="w-5/6 flex justify-end">
              <button className="w-fit h-8 flex justify-center items-center bg-blue-800" onClick={() => handleCloseModal()}>Close</button>
            </div>
            <form onSubmit={handleSubmit} className="w-5/6 p-2 flex flex-col rounded-md h-[75vh] border bg-slate-900 overflow-hidden gap-1">
              <div className="flex justify-between w-full ">
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold mb-0">Course Name: {selectedExam?.courseName}</h2>
                  <span className="text-white">Lecturer: {selectedExam?.uploaderName}</span>
                </div>
                <div className="flex flex-col gap-0">
                  <span className="text-white"> Duration: {Math.floor(selectedExam?.examDuration / 60)} hours {selectedExam?.examDuration % 60} minutes</span>
                  <span>Time: {hours} hrs {minutes} mins {seconds} secs</span>
                </div>
              </div>
              <div className="flex overflow-hidden w-full gap-2">
                <hr />
                <div className="flex relative w-1/6 flex-col h-[60vh] overflow-y-scroll border overflow-hidden rounded-md">
                  <p className="sticky top-0 bg-slate-950 px-2 text-white w-full p-2">Attachments: {selectedExam?.pdfUrls?.length || 0}</p>
                  <div className="flex pt-1 gap-2 p-2 flex-col">
                    {
                      selectedExam?.pdfUrls?.length > 0 && selectedExam?.pdfUrls.map((p) => {
                        const imageUrl = p.replace(/\.pdf$/, ".png");
                        return (
                          <a href={p} target="_blank" className="flex flex-col" key={p}>
                            <img src={imageUrl} className="h-44 w-36 border" />
                          </a>
                        )
                      })
                    }
                  </div>
                </div>
                <div className="flex gap-3 w-5/6 flex-col bg-slate-950 rounded-md p-2">
                  <div className="flex gap-2">
                    <span className="text-white font-semibold">Questions: </span>
                    <span>{selectedExam?.questions?.length > 0 ? selectedExam?.questions?.length : "No questions added, check attachments!"}</span>
                  </div>
                  <div className="flex flex-col overflow-y-scroll h-[60vh] border p-2 rounded-md">
                    {/* Mapping each question and providing a textarea for answers */}
                    {selectedExam?.questions?.length > 0 &&
                      selectedExam.questions.map((question, index) => (
                        <div className="flex flex-col gap-2">
                          {console.log(question)}
                          <div key={index} className="flex gap-2">
                            <span className="text-white font-semibold">
                              Question {index + 1}:
                            </span>
                            <span>{question}</span>
                          </div>
                          <textarea
                            placeholder={`Answer to Question ${index + 1}`}
                            className="border rounded-md outline-none p-2"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                disabled={remainingTime === 0}
              >
                Submit
              </button>


            </form>
          </div>
        )
        }
        {/*  */}
      </div ></div >
  );
};

export default ExamList;
