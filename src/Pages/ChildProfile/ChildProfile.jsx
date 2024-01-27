import React, { useState } from "react";
import "./ChildProfile.css";
import Sidebar from "../../Components/Sidebar";

import {
  FaBook,
  FaClinicMedical,
  FaHistory,
  FaPeopleArrows,
  FaUserSecret,
} from "react-icons/fa";
import ChildAttendance from "../../Components/ChildAttendance";
import Medical from "../../Components/Medical";
import AttendanceHistory from "../../Components/AttendanceHistory";
import {
  getChildDetails,
  logoutChild,
  updateChild,
} from "../../Redux/Actions/UserAction";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./../../Components/Loading/Loading";
import { getCourses } from "../../Redux/Actions/CourseActions";
import Error from "../../Components/Error/Error";
import ChildParent from "../../Components/ChildParent";
import Billing from "../../Components/Billing";
import SmallSidebar from "../../Components/SmallSidebar";
import Head from './../../Components/Head/Head';
const ChildProfile = () => {
  const childProfileDetails = [
    {
      id: "profile",
      label: "Profile",
      icon: <FaUserSecret />,
      path: "/profile",
      section: "contact",
    },
    {
      id: "parent",
      label: "Guardian",
      icon: <FaPeopleArrows />,
      path: "/addjob",
      section: "parent",
    },
    {
      id: "billing",
      label: "Billing",
      icon: <FaBook />,
      path: "/addjob",
      section: "billing",
    },
    {
      id: "medical",
      label: "Medical",
      icon: <FaClinicMedical />,
      path: "/addjob",
      section: "medical",
    },
    {
      id: "attendance",
      label: "Attendance",
      icon: <FaBook />,
      path: "/addjob",
      section: "attendance",
    },
    {
      id: "attendanceH",
      label: "History",
      icon: <FaHistory />,
      path: "/addjob",
      section: "history",
    },

    // Add more details as needed
  ];
  const [activeSection, setActiveSection] = useState("contact");

  const showSection = (sectionName) => {
    setActiveSection(sectionName);
  };

  const childDetails = useSelector((state) => state.childDetails);
  const { error, loading, user } = childDetails;

  const courseDetails = useSelector((state) => state.courseDetails);
  const { courses, loading: loadingCourse, error: errorCourse } = courseDetails;
  // console.log(courses)

  const childUpdate = useSelector((state) => state.childUpdate);
  const {
    loading: updateLoading,
    error: errorUpdate,
    childInfoUpdate,
  } = childUpdate;

  const initialMedicalInfo = {
    allergies: user?.user?.allergies
      ? user?.user?.allergies.reduce(
          (acc, item) => acc.concat(item.split(", ")),
          []
        )
      : [],
    medicalConditions: user?.user?.medicalConditions
      ? user?.user?.medicalConditions.reduce(
          (acc, item) => acc.concat(item.split(", ")),
          []
        )
      : [],
    otherFields: user?.user?.otherFields || {},
  };
  const [child, setChild] = useState({
    firstName: user?.user?.firstName,
    lastName: user?.user?.lastName,
    email: user?.user?.email,
    dateOfBirth: moment(user?.user?.dateOfBirth).format("MM-DD-YYYY"),
    city: user?.user?.city,
    state: user?.user?.state,
    country: user?.user?.country,
    password: user?.user?.newPassword,
  });
  React.useEffect(() => {
    if (user) {
      setChild({
        firstName: user?.user?.firstName,
        lastName: user?.user?.lastName,
        email: user?.user?.email || " ",
        dateOfBirth: moment(user?.user?.dateOfBirth).format("MM-DD-YYYY"),
        city: user?.user?.city,
        state: user?.user?.state,
        country: user?.user?.country,
        password: user?.user?.newPassword,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChild({ ...child, [name]: value });
  };

  //****** UPDATE USER FUNCTION****
  const handleUpdate = async () => {
    try {
      await dispatch(updateChild(child));
      await dispatch(getChildDetails());
      if (childInfoUpdate) {
        toast.success("Child Profile Updated!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      // Show Toast on successful update
    } catch (error) {
      // Handle error if the update fails
    }
  };

  const childLogin = useSelector((state) => state.childLogin);
  const { childInfo } = childLogin;
  console.log("USER INFO", childInfo);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getChildDetails());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutChild());
  };
  const setSidebar = useSelector((state) => state.setSidebar);
  const { isSidebarActive } = setSidebar;
  return (
    <div className="d-flex ">
      <Sidebar
        showSection={showSection}
        data={childProfileDetails}
        activeSection={activeSection}
      />
      <SmallSidebar
        showSection={showSection}
        data={childProfileDetails}
        activeSection={activeSection}
      />
      <div className={isSidebarActive ? "main" : "full"}>
        <Head
          handleLogout={handleLogout}
          firstName={childInfo?.firstName}
          lastName={childInfo?.lastName}
        />
        <div className="addjob-wrapper py-4 px-1 px-md-4">
          <ToastContainer autoClose={1000} />
          <div className="container">
            <div className="child-profilet">
              <section
                style={{
                  display: activeSection === "contact" ? "block" : "none",
                }}
              >
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Error error={error} />
                ) : (
                  <div className="personal-profile">
                    <h2>Child's Personal Profile</h2>
                    <div className="profile-details">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={child?.firstName}
                          placeholder="Enter first name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={child?.lastName}
                          placeholder="Enter last name"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={child?.password}
                          placeholder="change password"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth</label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={moment(child?.dateOfBirth).format(
                            "MM-DD-YYYY"
                          )}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                          id="gender"
                          onChange={handleChange}
                          value={child.gender}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          placeholder="Enter city"
                          onChange={handleChange}
                          value={child.city}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">State</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          placeholder="Enter zip code"
                          onChange={handleChange}
                          value={child.state}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          placeholder="Enter country"
                          onChange={handleChange}
                          value={child.country}
                        />
                      </div>
                      {/* Other profile fields can be added */}
                    </div>
                    <div className="button-container">
                      <button
                        className="update-profile-btn"
                        onClick={handleUpdate}
                        disabled={updateLoading}
                      >
                        Update Profile
                      </button>
                      {updateLoading && <Loading />}
                    </div>
                  </div>
                )}
              </section>
              <section
                style={{
                  display: activeSection === "parent" ? "block" : "none",
                }}
              >
                <ChildParent user={user} />
              </section>
              <section
                style={{
                  display: activeSection === "billing" ? "block" : "none",
                }}
              >
                <Billing />
              </section>
              <section
                style={{
                  display: activeSection === "attendance" ? "block" : "none",
                }}
              >
                <ChildAttendance
                  courses1={courses?.courses}
                  course2={courses}
                  errorCourse={errorCourse}
                />
              </section>
              <section
                style={{
                  display: activeSection === "medical" ? "block" : "none",
                }}
              >
                <section>
                  <Medical
                    child={child}
                    initialMedicalInfo={initialMedicalInfo}
                  />
                </section>
              </section>
              <section
                style={{
                  display: activeSection === "history" ? "block" : "none",
                }}
              >
                <AttendanceHistory />
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildProfile;
