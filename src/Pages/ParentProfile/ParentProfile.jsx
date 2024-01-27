import React, { useState } from "react";
import "./ParentProfile.css";
import Sidebar from "../../Components/Sidebar";

import axios from "axios";
import {
  FaBook,
  FaChild,
  FaHistory,
  FaUserSecret,
} from "react-icons/fa";

import {
  getEnroll,
  getParentDetails,
  logout,
  updateParent,
} from "../../Redux/Actions/UserAction";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Error from "../../Components/Error/Error";
import Loading from "../../Components/Loading/Loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import SmallSidebar from "./../../Components/SmallSidebar";
import Head from "./../../Components/Head/Head";


const ParentProfile = () => {
 
   const api = axios.create({
     baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
   });
  // Simulated data and initial state

  const parentProfileDetails = [
    {
      id: "profile",
      label: "Profile",
      icon: <FaUserSecret />,
      path: "/profile",
      section: "contact",
    },
    {
      id: "enrolled",
      label: "Enrolled",
      icon: <FaChild />,
      path: "/alljobs",
      section: "enrolled",
    },
    {
      id: "children",
      label: "Children",
      icon: <FaBook />,
      path: "/addjob",
      section: "children",
    },

    {
      id: "hist",
      label: "Billling History",
      icon: <FaHistory />,
      path: "/alljobs",
      section: "hist",
    },

    // Add more details as needed
  ];

  const parentDetails = useSelector((state) => state.parentDetails);
  const { error, loading: loadingParent, user } = parentDetails;

  const parentUpdate = useSelector((state) => state.parentUpdate);
  const { error: parentUpdateError, loading } = parentUpdate;

  const dispatch = useDispatch();
  const [name, setName] = React.useState(user?.firstName);
  const [lastname, setLastName] = React.useState(user?.lastName);
  const [location, setLocation] = React.useState(user?.location);
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  React.useEffect(() => {
    dispatch(getParentDetails());
  }, [dispatch]);

  console.log(user);

  React.useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setLocation(user?.location);
      setLastName(user?.lastname);
    }
  }, [dispatch, user]);

  const enrolled = useSelector((state) => state.enrolled);
  const {
    error: enrollError,
    loading: enrollLoading,
    enrollmentDetailInfo,
  } = enrolled;
  console.log("THIS IS THE ENROLLMENT:", enrollmentDetailInfo);

  React.useEffect(() => {
    dispatch(getEnroll());
  }, [dispatch]);

  const [editMode, setEditMode] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };



  const handleSave = async () => {
    try {
      await dispatch(updateParent(updatedData));
      await dispatch(getParentDetails());
      setUpdatedData({});
      toast.success("Profile Updated!", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setEditMode(false);
      // Show Toast on successful update
    } catch (error) {
      // Handle error if the update fails
    }
  };

  const [activeSection, setActiveSection] = useState("contact");

  const showSection = (sectionName) => {
    setActiveSection(sectionName);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const [loadingb, setLoading] = useState(false);
  const [billingHistoryData, setBillingHistoryData] = useState();

  React.useEffect(() => {
    const fetchBillingHistory = async () => {
      if (user?.user?.children) {
        setLoading(true);
        try {
          const userrString = localStorage.getItem("parentInfo");
          const userr = JSON.parse(userrString);
          const headers = {
            Authorization: `Bearer ${userr.token}`,
            "Content-Type": "application/json",
          };
          const childIds = user?.user?.children?.map((child) => child._id);
          const promises = childIds.map(async (childId) => {
            try {
              const response = await axios.post(
                "/api/billing/billing/history",
                { childIds: childIds },
                { headers }
              );

              return response.data;
            } catch (error) {
              throw error.response?.data?.message || error.message;
            }
          });

          const billingHistoryData = await Promise.all(promises);
          console.log(
            "DATAAAA",
            billingHistoryData.flatMap((entry) => entry)
          );

          // Update state with billing history data
          setBillingHistoryData(billingHistoryData.flatMap((entry) => entry));

          setLoading(false);
        } catch (error) {
          console.error("Error fetching billing history:", error);

          // Handle error, e.g., update state or show error message

          setLoading(false);
        }
      }
    };

    fetchBillingHistory();
  }, [user]);
  console.log(billingHistoryData);
  const setSidebar = useSelector((state) => state.setSidebar);
  const { isSidebarActive } = setSidebar;
  return (
    <div className="d-flex">
      <Sidebar
        showSection={showSection}
        data={parentProfileDetails}
        activeSection={activeSection}
      />
      <SmallSidebar
        showSection={showSection}
        data={parentProfileDetails}
        activeSection={activeSection}
      />
      <div className={isSidebarActive ? "main" : "full"}>
        <Head
          handleLogout={handleLogout}
          lastName={user?.user?.lastName}
          firstName={user?.user?.firstName}
        />
        <div className="addjob-wrapper  py-4 ">
          <div className="container">
            <div className="parent-profile">
              <ToastContainer autoClose={1000} />
              {loadingParent ? (
                <Loading />
              ) : error ? (
                <Error>{error}</Error>
              ) : (
                <section
                  style={{
                    display: activeSection === "contact" ? "block" : "none",
                  }}
                >
                  {editMode ? (
                    <div class="edit-mode">
                      {parentUpdateError && <Error error={parentUpdateError} />}

                      <div className="input-row">
                        <div class="input-group">
                          <label for="firstName">First Name</label>
                          <input
                            type="text"
                            name="firstName"
                            value={updatedData.firstName}
                            class="input-field"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div class="input-group">
                          <label for="lastName">Last Name</label>
                          <input
                            type="text"
                            name="lastName"
                            value={updatedData.lastName}
                            class="input-field"
                            onChange={handleInputChange}
                          />
                        </div>

                        <div class="input-group">
                          <label for="contact">Phone Number</label>
                          <input
                            type="text"
                            name="contact"
                            value={updatedData.contact}
                            class="input-field"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div class="input-group">
                          <label for="email">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={updatedData.email}
                            class="input-field"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div class="input-group">
                          <label for="homeAddress">Home Address</label>
                          <input
                            type="text"
                            name="homeAddress"
                            value={updatedData.homeAddress}
                            class="input-field"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div class="input-group">
                          <label for="homeAddress">Work Address</label>
                          <input
                            type="text"
                            name="workAddress"
                            value={updatedData.workAddress}
                            class="input-field"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form
                      className="stats-card row"
                      // onSubmit={(e) => handleUpdate(e)}
                    >
                      <div className="mb-3 wid mt-0 col-12 col-lg-6 col-xl-4">
                        <label for="search" className="form-label">
                          First Name
                        </label>
                        <input
                          type="tel"
                          value={user?.user?.firstName}
                          // onChange={(e) => setName(e.target.value)}
                          className="form-control"
                          id="search"
                        />
                      </div>
                      <div className="mb-3 wid mt-0 col-12 col-lg-6 col-xl-4">
                        <label for="search" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="email"
                          value={user?.user?.lastName}
                          // onChange={(e) => setLastName(e.target.value)}
                          className="form-control"
                          id="search"
                        />
                      </div>
                      <div className="mb-3 wid mt-0 col-12 col-lg-6 col-xl-4">
                        <label for="search" className="form-label">
                          Email
                        </label>
                        <input
                          type="text"
                          value={user?.user?.email}
                          // onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          id="search"
                        />
                      </div>
                      <div className="mb-3 wid mt-0 col-12 col-lg-6 col-xl-4">
                        <label for="search" className="form-label">
                          Contact
                        </label>
                        <input
                          type="tel"
                          value={user?.user?.contact}
                          // onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          id="search"
                        />
                      </div>
                      <div className="mb-3 wid mt-0 col-12 col-lg-6 col-xl-4">
                        <label for="search" className="form-label">
                          Home Address
                        </label>
                        <input
                          type="tel"
                          value={user?.user?.homeAddress}
                          // onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          id="search"
                        />
                      </div>
                      <div className="mb-3 wid mt-0 col-12 col-lg-6 col-xl-4">
                        <label for="search" className="form-label">
                          Work Address
                        </label>
                        <input
                          type="tel"
                          value={user?.user?.workAddress}
                          // onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          id="search"
                        />
                      </div>
                    </form>
                  )}
                  {loading && <Loading />}
                  <div className="buttons">
                    <button
                      className="edit-button"
                      style={{
                        backgroundColor: editMode
                          ? "#f1f1f1"
                          : "var(--color-primary)",
                        color: editMode ? "black" : "",
                      }}
                      onClick={() => setEditMode(!editMode)}
                      disabled={loading}
                    >
                      {editMode ? "Cancel" : "Edit"}
                    </button>

                    {editMode && (
                      <button className="save-button" onClick={handleSave}>
                        Save
                      </button>
                    )}
                  </div>
                </section>
              )}

              <div
                style={{
                  display: activeSection === "enrolled" ? "block" : "none",
                }}
                className="r"
              >
                <h2>Children Enrolled</h2>
                <div className="child-table-containerr">
                  <table className="child-tablee">
                    <thead>
                      <tr>
                        <th>Fist Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Allergies</th>
                        <th>Medical Conditions</th>
                        <th>Program</th>
                        <th>Date Enrolled</th>
                        <th>Admmission Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollmentDetailInfo?.map((child) => (
                        <tr>
                          <td>{child?.childDetails?.firstName}</td>
                          <td>{child?.childDetails?.lastName}</td>
                          <td>
                            {moment(child.childDetails.dateOfBirth).format(
                              "DD-MM-YYYY"
                            )}
                          </td>
                          <td>{child.childDetails.allergies.join(" ")}</td>
                          <td>
                            {child.childDetails.medicalConditions?.join(" ")}
                          </td>
                          <td>{child.typeOfProgram}</td>
                          <td>
                            {" "}
                            {moment(child.enrollmentDate).format("DD-MM-YYYY")}
                          </td>
                          <td
                            className={
                              child.status === "Admitted"
                                ? "admitted"
                                : child.status === "Processing Admission"
                                ? "processing"
                                : "declined"
                            }
                          >
                            {child.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <section
                style={{
                  display: activeSection === "children" ? "block" : "none",
                }}
              >
                {" "}
                <h2>Children Admitted</h2>
                <table className="child-tablee">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Country</th>
                      <th>State</th>
                      <th>City</th>
                      <th>Session</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistoryData?.map((billing) => {
                      return (
                        <tr key={billing._id}>
                          <td>
                            {billing?.child?.firstName}{" "}
                            {billing?.child?.lastName}
                          </td>
                          <td>{billing?.child?.email}</td>
                          <td>{billing?.child?.country}</td>
                          <td>{billing?.child?.state}</td>
                          <td>{billing?.child?.city}</td>

                          <td>{billing.session}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>
              <section
                style={{
                  display: activeSection === "hist" ? "block" : "none",
                }}
              >
                <h2>Billing History</h2>
                <table className="child-tablee">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Registration Fee</th>
                      <th>Session</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {billingHistoryData?.map((billing) => {
                      console.log("BILLING", billing?.tuitionFee);
                      const amount =
                        billing?.tuitionFee +
                        billing?.booksFee +
                        billing?.activityFee;
                      return (
                        <tr
                          key={billing._id}
                          style={{
                            backgroundColor: billing?.isPaid
                              ? "green"
                              : "rgb(230, 140, 172)",
                            color: "white",
                          }}
                        >
                          <td>
                            {billing?.child?.firstName}{" "}
                            {billing?.child?.lastName}
                          </td>
                          <td>${amount}</td>
                          <td>{billing?.session}</td>
                          <td>{billing?.isPaid ? "Paid" : "Not Paid"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>

              {/* Additional sections for settings, notifications, etc. */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentProfile;
