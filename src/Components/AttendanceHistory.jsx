import React from "react";
import { getAttendance } from "../Redux/Actions/AttendanceActions";
import { useSelector, useDispatch } from "react-redux";

import Loading from "./Loading/Loading";
import Error from "./Error/Error";

const AttendanceHistory = () => {
  const attendanceByCourse = [
    {
      course: "Mathematics",
      attendance: [
        { date: "2023-12-01", status: "Present" },
        { date: "2023-12-03", status: "Present" },
        // Add more attendance data for Mathematics as needed
      ],
    },
    {
      course: "Science",
      attendance: [
        { date: "2023-12-01", status: "Absent" },
        { date: "2023-12-04", status: "Present" },
        // Add more attendance data for Science as needed
      ],
    },
    // Add more course attendance data as needed
  ];
  const dispatch = useDispatch();
  const attendanceHistory = useSelector((state) => state.attendanceHistory);
  const {
    loading: historyLoading,
    error: historyError,
    attendance,
  } = attendanceHistory;
  console.log(attendance);

  React.useEffect(() => {
    dispatch(getAttendance());
  }, [dispatch]);

  const getStatusColor = (status) => {
    return status === "present"
      ? "#1b5e1b"
      : status === "confirming"
      ? "#5297b2"
      : "red";
  };
  return (
    <div className="attendance-history">
      <h2>Child's Attendance History by Course</h2>
      {historyLoading ? (
        <Loading />
      ) : historyError ? (
        <Error>{historyError}</Error>
      ) : (
        attendance?.attendanceHistory?.map((courseData, index) => (
          <div className="course-attendance" key={index}>
            <h3>{courseData?.courseId?.name?.toUpperCase()}</h3>
            <div className="child-table-containerr">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Attendance Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      backgroundColor: getStatusColor(courseData.status),
                      color: "white",
                    }}
                    key={index}
                  >
                    <td>{courseData?.courseId?.name?.toUpperCase()}</td>
                    <td>{new Date(courseData.date).toLocaleDateString()}</td>
                    <td>{courseData?.courseId?.location}</td>
                    <td>
                      {courseData.status === "present" ? (
                        <div className="d-flex align-items-center">
                          Present
                          <span className="material-symbols-outlined">
                            task_alt
                          </span>
                        </div>
                      ) : courseData.status === "confirming" ? (
                        "Confirming..."
                      ) : (
                        "Absent"
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceHistory;
