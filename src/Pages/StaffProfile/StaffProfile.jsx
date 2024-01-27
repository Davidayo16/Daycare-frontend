import React, { useState } from "react";
import "./StaffProfile.css";
import Sidebar from "../../Components/Sidebar";

import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { FaBook, FaSearch, FaTasks, FaUserSecret } from "react-icons/fa";
import { getStaffDetails, logoutStaff } from './../../Redux/Actions/UserAction';
import SmallSidebar from "../../Components/SmallSidebar";
import Head from './../../Components/Head/Head';
const StaffProfile = () => {
  
  const dispatch = useDispatch();
  const scheduleData = [
    {
      id: 1,
      date: "2024-02-01",
      shift: "Morning",
      workingHours: "8:00 AM - 12:00 PM",
    },
    {
      id: 2,
      date: "2024-02-02",
      shift: "Afternoon",
      workingHours: "1:00 PM - 5:00 PM",
    },
  
    // Add more dummy schedule data items as needed
  ];
  const taskListData = [
    {
      id: 1,
      task: "Prepare learning materials for toddlers",
      deadline: "2024-02-05",
      progress: "In Progress",
    },
    {
      id: 2,
      task: "Organize outdoor play activities",
      deadline: "2024-02-07",
      progress: "Not Started",
    },
    {
      id: 3,
      task: "Plan art and craft sessions",
      deadline: "2024-02-10",
      progress: "Completed",
    },
    // Add more dummy task list items as needed
  ];
  const getProgressColor = (progress) => {
    switch (progress) {
      case "not started":
        return "red";
      case "in progress":
        return " #ce8a32";
      case "completed":
        return "green";
      default:
        return "black"; // Default color if the status doesn't match
    }
  };
  const staffProfileDetails = [
    {
      id: "profile",
      label: "Profile",
      icon: <FaUserSecret />,

      section: "contact",
    },
    {
      id: "work",
      label: "Work Schedule",
      icon: <FaBook />,
      path: "/addjob",
      section: "work",
    },
    {
      id: "task",
      label: "Task List",
      icon: <FaTasks />,

      section: "task",
    },
    // Add more details as needed
  ];


  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({ });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };


  const [activeSection, setActiveSection] = useState("contact");

  const showSection = (sectionName) => {
    setActiveSection(sectionName);
  };
  const staffDetails = useSelector((state) => state.staffDetails);
  const { error, loading, user } = staffDetails;

    const [staff, setStaff] = useState({
      firstName: user?.user?.firstName,
      lastName: user?.user?.lastName,
      email: user?.user?.email,
      position: user?.user?.position,
      department: user?.user?.department,
      password: user?.user?.newPassword,
    });
    React.useEffect(() => {
      if (user) {
        setStaff({
          firstName: user?.user?.firstName,
          lastName: user?.user?.lastName,
          email: user?.user?.email || " ",
          position: user?.user?.position,
          department: user?.user?.department,
          password: user?.user?.newPassword,
        });
      }
    }, [user]);

    React.useEffect(() => {
      dispatch(getStaffDetails());
    }, [dispatch]);
  
  
  const staffLogin = useSelector((state) => state.staffLogin);
  const { staffInfo } = staffLogin;
  console.log("USER INFO", staffInfo);

    const handleLogout = () => {
      dispatch(logoutStaff());
    };
    const setSidebar = useSelector((state) => state.setSidebar);
    const { isSidebarActive } = setSidebar;
  return (
    <div className="d-flex">
      <Sidebar
        data={staffProfileDetails}
        showSection={showSection}
        activeSection={activeSection}
      />
      <SmallSidebar
        showSection={showSection}
        data={staffProfileDetails}
        activeSection={activeSection}
      />
      <div className={isSidebarActive ? "main" : "full"}>
        <Head
          handleLogout={handleLogout}
          firstName={staffInfo?.firstName}
          lastName={staffInfo?.lastName}
        />

        <div className="addjob-wrapper  py-4 px-1 px-md-4">
          <div className="container">
            <section
              style={{
                display: activeSection === "contact" ? "block" : "none",
              }}
            >
              <div className="staff-profile">
                <h2>Staff Profile</h2>
                <div className="profile-details">
                  <div className="form-group">
                    <label htmlFor="staffName">First Name</label>
                    <input
                      type="text"
                      id="staffName"
                      placeholder="Enter staff name"
                      value={staff?.firstName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="staffName">Staff Name</label>
                    <input
                      type="text"
                      id="staffName"
                      placeholder="Enter staff name"
                      value={staff?.lastName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="staffPosition">Position</label>
                    <input
                      type="text"
                      id="staffPosition"
                      placeholder="Enter position"
                      value={staff?.position}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="staffDepartment">Department</label>
                    <input
                      type="text"
                      id="staffDepartment"
                      placeholder="Enter department"
                      value={staff?.department}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="staffEmail">Email</label>
                    <input
                      type="email"
                      id="staffEmail"
                      placeholder="Enter email"
                      value={staff?.email}
                    />
                  </div>
                </div>
                <div className="button-container">
                  <button className="update-profile-btn">Update Profile</button>
                </div>
              </div>
            </section>
            <section
              className=""
              style={{
                display: activeSection === "work" ? "block" : "none",
              }}
            >
              <div className="staff-profile">
                <h2 className="mt-2 st">Work Schedule</h2>
                <div className="mt-4 staff-cont child-table-container">
                  <table class="table child-table">
                    <thead>
                      <tr>
                        <th scope="col">Dates</th>
                        <th scope="col">Shifts</th>
                        <th scope="col">Working Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleData.map((item) => (
                        <tr key={item.id} scope="row">
                          <td>{item.date}</td>
                          <td>{item.shift}</td>
                          <td>{item.workingHours}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
            <section
              className=""
              style={{
                display: activeSection === "task" ? "block" : "none",
              }}
            >
              <div className="staff-profile">
                <h2 className="mt-2">Staff Task List</h2>
                <div className="mt-4 staff-cont child-table-container">
                  <table className="table child-table">
                    <thead>
                      <tr>
                        <th scope="col">Task</th>
                        <th scope="col">Deadline</th>
                        <th scope="col">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user?.user?.tasks?.map((item) => (
                        <tr key={item.id} scope="row">
                          <td>{item.description}</td>
                          <td>{item.deadline}</td>
                          <td
                            style={{ color: getProgressColor(item.progress) }}
                          >
                            {item.progress}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;
