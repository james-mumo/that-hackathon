import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSchedule = () => {
    const [formData, setFormData] = useState({
        courseName: '',
        lectureName: '',
        courseLecturer: '',
        timeOfSubject: '',
        dayOfSubject: '',
    });

    const [school, setSchool] = useState('');
    const [lecturer, setLecturer] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}api/schedule/`, {
                courseName: formData.courseName,
                lectureName: formData.lectureName,
                courseLecturer: formData.courseLecturer,
                timeOfSubject: formData.timeOfSubject,
                dayOfSubject: formData.dayOfSubject,
            });

            // Handle the response as needed, e.g., show a success message or redirect the user
            console.log('Event added successfully:', response.data);

            // Reset the form
            setFormData({
                courseName: '',
                lectureName: '',
                courseLecturer: '',
                timeOfSubject: '',
                dayOfSubject: '',
            });
        } catch (error) {
            // Handle errors, e.g., display an error message to the user
            console.error('Error adding event:', error);
        }
    };

    useEffect(() => {
        const storedUserItem = localStorage.getItem('userData');

        if (storedUserItem) {
            const storedUserData = JSON.parse(storedUserItem);
            setSchool(storedUserData.schoolOf);
            setLecturer(storedUserData.fullname);
        } else {
            setSchool('');
        }
    }, []);

    const hours = Array.from({ length: 11 }, (_, i) => {
        const hour = i + 8;
        return `${hour < 10 ? '0' : ''}${hour}:00`;
    });

    return (
        <div className="w-2/5 p-6 bg-slate-900 border h-full rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-2">Add Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <label className="block text-white text-sm font-bold mb-2">Course Name:</label>
                    <select
                        type="text"
                        name="courseName"
                        value={formData.courseName}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
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
                <div className="mb-1">
                    <label className="block text-white text-sm font-bold mb-2">Lecture Name:</label>
                    <input
                        type="text"
                        name="lectureName"
                        value={formData.lectureName}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-1">
                    <label className="block text-white text-sm font-bold mb-2">Course Lecturer:</label>
                    <input
                        type="text"
                        name="courseLecturer"
                        value={formData.courseLecturer}
                        onChange={handleInputChange}
                        className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="flex w-full items-center justify-center gap-2 mb-1">
                    <div className="w-full">
                        <label className="block text-white text-sm font-bold">Time of Subject:</label>
                        <input
                            type="time"
                            id="timeOfSubject"
                            name="timeOfSubject"
                            value={formData.timeOfSubject}
                            onChange={handleInputChange}
                            className="border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            min="08:00"
                            max="18:00"
                            required
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-white text-sm font-bold">Day of Subject:</label>
                        <select
                            name="dayOfSubject"
                            value={formData.dayOfSubject}
                            onChange={handleInputChange}
                            className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select a day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                    </div>

                </div>
                <button
                    type="submit"
                    className="bg-gray-700 mt-3 hover:bg-gray-800 font-semibold w-full text-white transition duration-300 ease-in-out"
                >
                    Add Schedule Item
                </button>
            </form>
        </div>
    );
};

export default AddSchedule;
