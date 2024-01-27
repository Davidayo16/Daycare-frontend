import React, { useState, useEffect } from "react";
import axios from "axios";

const ChildAttendance = ({ courses1, course2, errorCourse }) => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
    });
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState({});

  useEffect(() => {
    const fetchAttendanceStatus = async (courseId) => {
      try {
        const userrString = localStorage.getItem("childInfo");
        const userr = JSON.parse(userrString);
        const headers = {
          Authorization: `Bearer ${userr.token}`,
          "Content-Type": "application/json",
        };

        const response = await api.get(
          `/api/attendance/attendance-status/${courseId}`,
          { headers }
        );
        console.log("THIS IS THE STATUS fFGS", response?.data);
        if (response.status === 200 && response.data) {
          setAttendanceStatus((prevStatus) => ({
            ...prevStatus,
            [courseId]: response.data.status==='present' ? "Marked" : response.data.status==='confirming' ? "confirming":"Not Marked",
          }));
        }
      } catch (error) {
        console.error("Error fetching attendance status:", error);
      }
    };

    // Fetch attendance status for each course
    courses1?.forEach((course) => {
      fetchAttendanceStatus(course._id);
      setLoading((prevLoading) => ({
        ...prevLoading,
        [course._id]: false, // Initialize loading state for each course
      }));
    });
  }, [courses1]); // Fetch attendance status whenever courses1 changes

  const markAttendance = async (courseId) => {
    try {
      setLoading((prevLoading) => ({ ...prevLoading, [courseId]: true }));

      const userrString = localStorage.getItem("childInfo");
      const userr = JSON.parse(userrString);
      const headers = {
        Authorization: `Bearer ${userr.token}`,
        "Content-Type": "application/json",
      };

      const response = await api.post(
        `/api/attendance/mark-attendance/${courseId}`,
        { status: "confirming" },
        { headers }
      );

      if (response.status === 201) {
        setAttendanceStatus((prevStatus) => ({
          ...prevStatus,
          [courseId]: "confirming",
        }));
      } else if (
        response.data.message === "Attendance already marked for today"
      ) {
        setAttendanceStatus((prevStatus) => ({
          ...prevStatus,
          [courseId]: "Already Marked",
        }));
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, [courseId]: false }));
    }
  };

  const renderCourseList = () => {
    return courses1?.map((course, index) => (
      <tr key={index}>
        <td>{course?.name.toUpperCase()}</td>
        <td>{course.location}</td>
        <td>
          {course.startTime} - {course?.endTime}
        </td>
        <td>{course.instructor}</td>
        <td>
          <button
            onClick={() => markAttendance(course._id)}
            disabled={
              loading[course._id] ||
              attendanceStatus[course._id] === "Marked" ||
              attendanceStatus[course._id] === "confirming"
            }
            className={`mark-attendance-btn ${
              attendanceStatus[course._id] === "Marked" ? "marked" : ""
            }`}
          >
            {loading[course._id] ? (
              "confirming..."
            ) : attendanceStatus?.[course._id] === "Marked" ? (
              <span class="material-symbols-outlined">task_alt</span>
            ) : (
              attendanceStatus?.[course._id]==="confirming"?(<>Confirming...</>):(
                <span class="material-symbols-outlined">
                  radio_button_unchecked
                </span>
              )
            )}
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="attendance-containerr">

      <h3>{course2?.message}</h3>
      <p>Date: {new Date().toLocaleDateString()}</p>
      
      <div className="child-table-containerr">
        <table className="course-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Location</th>
              <th>Time</th>
              <th>Instructor</th>
              <th>Mark Attendance</th>
            </tr>
          </thead>
          <tbody>{renderCourseList()}</tbody>
        </table>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ChildAttendance;
