import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Enrollment.css";
import { enroll } from "../../Redux/Actions/UserAction";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";
import Error from "../../Components/Error/Error";
const Enrollment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [childInfo, setChildInfo] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    state: "",
    city: "",
    email: "",
    country: "",
    allergies: [],
    medicalCondition: [],
  });

  const [parentInfo, setParentInfo] = useState({
    fullName: "",
    relationship: "",
    emailAddress: "",
    contactInfo: "",
    homeAddress: "",
    workAddress: "",
    emergencyContactInfo: "",
  });

  const [pickupPerson, setPickupPerson] = useState({
    fullName: "",
    relationship: "",
    contactInfo: "",
  });

  const [program, setProgram] = useState("");

  const handleChildInfoChange = (e) => {
    const { name, value } = e.target;

    // For the gender field, directly set the value in the state
    if (name === "gender") {
      setChildInfo({ ...childInfo, [name]: value });
    } else {
      // For other fields, update the state as usual
      setChildInfo({ ...childInfo, [name]: value });
    }
  };

  const handleParentInfoChange = (e) => {
    const { name, value } = e.target;
    setParentInfo({ ...parentInfo, [name]: value });
  };

  const handlePickupPersonChange = (e) => {
    const { name, value } = e.target;
    setPickupPerson({ ...pickupPerson, [name]: value });
  };

  const handleProgramChange = (e) => {
    setProgram(e.target.value);
  };

  const enrollmentDetails = useSelector((state) => state.enrollmentDetails);
  const { enrollmentInfo, loading, error } = enrollmentDetails;
  console.log(enrollmentInfo);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      childDetails: {
        firstName: childInfo.firstName,
        lastName: childInfo.lastName,
        country: childInfo.country,
        state: childInfo.state,
        city: childInfo.city,
        dateOfBirth: new Date(childInfo.dateOfBirth), // Convert date string to Date object
        gender: childInfo.gender,
        email: childInfo.email,
        allergies: childInfo.allergies,
        medicalConditions: childInfo.medicalConditions,
        // Add other child details if needed
      },
      enrollmentDate: new Date(), // Example: Use current date/time
      authorizedPickupPersons: [pickupPerson], // Wrap pickup person in an array
      typeOfProgram: program,
      // Add other fields as required by the backend schema
    };

    dispatch(enroll(formattedData));
  };
  React.useEffect(() => {
    if (enrollmentInfo) {
      navigate("/parentprofile");
    }
  }, [navigate, enrollmentInfo]);
  return (
    <section className="enrol-wrapper py-4">
      <div className="container">
        <div className="intro-cont d-flex align-items-center">
          <div class="intro-text ">
            <h2>
              Welcome to Our{" "}
              <span style={{ color: "var(--color-primary)" }}>Daycare</span>{" "}
              Enrollment
            </h2>
            <p>
              Thank you for choosing our daycare services. We are excited to
              start this journey with you and your child! To ensure we provide
              the best care possible, please fill out the following form with
              the necessary details. Your input helps us understand your child's
              needs better and ensures a safe and enjoyable experience.
            </p>
            <p>
              If you have any questions or require assistance while completing
              the form, our team is here to help. Please feel free to reach out,
              and we'll gladly assist you.
            </p>
            <p>
              We appreciate your trust in us and look forward to welcoming your
              child into our daycare family!
            </p>
          </div>
          <div className="w-100 d-md-block d-none">
            <img className="img-fluid intro-img" src="/images/enrol.png " />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <svg
              id="logo-16"
              width="109"
              height="43"
              viewBox="0 0 109 43"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {" "}
              <path
                d="M64.9315 11.4284C62.1883 8.6852 58.9316 6.5091 55.3475 5.0245C51.7633 3.5399 47.9219 2.7758 44.0424 2.7758C40.1629 2.7758 36.3215 3.5399 32.7373 5.0245C29.1532 6.5091 25.8965 8.6852 23.1533 11.4284L44.0424 32.3174L64.9315 11.4284Z"
                class="ccompli1"
                fill="#FFD200"
              ></path>{" "}
              <path
                d="M44.0686 32.3475C46.8118 35.0907 50.0684 37.2667 53.6526 38.7513C57.2367 40.2359 61.0782 41 64.9577 41C68.837 41 72.679 40.2359 76.263 38.7513C79.847 37.2667 83.104 35.0907 85.847 32.3475L64.9577 11.4584L44.0686 32.3475Z"
                class="ccompli2"
                fill="#06E07F"
              ></path>{" "}
              <path
                d="M44.017 32.3429C41.2738 35.0861 38.0171 37.2621 34.433 38.7467C30.8488 40.2313 27.0074 40.9954 23.1279 40.9954C19.2484 40.9954 15.407 40.2313 11.8228 38.7467C8.2387 37.2621 4.982 35.0861 2.2388 32.3429L23.1279 11.4538L44.017 32.3429Z"
                class="ccustom"
                fill="#E3073C"
              ></path>{" "}
              <path
                d="M64.9831 11.433C67.726 8.6898 70.983 6.5138 74.567 5.0292C78.151 3.5446 81.993 2.7805 85.872 2.7805C89.752 2.7805 93.593 3.5446 97.177 5.0292C100.761 6.5138 104.018 8.6898 106.761 11.433L85.872 32.3221L64.9831 11.433Z"
                class="ccustom"
                fill="#1F84EF"
              ></path>{" "}
            </svg>
          </div>
          <div>
            <h2 className="mt-4 mb-3">Child's Information</h2>
            <div className="form-container">
              <div class="mb-3 i">
                <label for="firstName" class="form-label">
                  First Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  name="firstName"
                  value={childInfo.firstName}
                  onChange={handleChildInfoChange}
                  required={true}
                />
              </div>
              <div className="mb-3 i">
                <label for="lastName" class="form-label">
                  Last Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  name="lastName"
                  value={childInfo.lastName}
                  required={true}
                  onChange={handleChildInfoChange}
                />
              </div>
              <div className="mb-3 i">
                <label for="dateOfBirth" class="form-label">
                  Date of Birth<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={childInfo.dateOfBirth}
                  onChange={handleChildInfoChange}
                  required={true}
                />
              </div>
              <div className="mb-3 i">
                <label for="email" class="form-label">
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  name="email"
                  value={childInfo.email}
                  onChange={handleChildInfoChange}
                  required={true}
                />
              </div>
              <div className="mb-3 i">
                <label for="country" class="form-label">
                  Country<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="country"
                  name="country"
                  value={childInfo.country}
                  onChange={handleChildInfoChange}
                  required={true}
                />
              </div>
              <div className="mb-3 i">
                <label for="state" class="form-label">
                  State<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="state"
                  name="state"
                  value={childInfo.state}
                  onChange={handleChildInfoChange}
                  required={true}
                />
              </div>
              <div className="mb-3 i">
                <label for="city" class="form-label">
                  City<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="city"
                  name="city"
                  value={childInfo.city}
                  onChange={handleChildInfoChange}
                  required={true}
                />
              </div>
              <div className="mb-3 i">
                <label for="lastName" class="form-label">
                  Gender<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleChildInfoChange}
                  value={childInfo.gender}
                  required={true}
                >
                  <option selected>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="mb-3 mt-4">Parent/Guardian Information</h2>
            <div className="form-container">
              <div class="mb-3 i">
                <label for="fullName" class="form-label">
                  Full Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="fullName"
                  name="fullName"
                  value={parentInfo.fullName}
                  onChange={handleParentInfoChange}
                  required={true}
                />
              </div>
              <div class="mb-3 i">
                <label for="relationship" class="form-label">
                  Relationship to child<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="relationship"
                  name="relationship"
                  value={parentInfo.relationship}
                  onChange={handleParentInfoChange}
                  required={true}
                />
              </div>
              <div class="mb-3 i">
                <label for="emailAddress" class="form-label">
                  Email Address<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="emailAddress"
                  name="emailAddress"
                  value={parentInfo.emailAddress}
                  onChange={handleParentInfoChange}
                  required={true}
                />
              </div>
              <div class="mb-3 i">
                <label for="contactInfo" class="form-label">
                  Contact Info
                </label>
                <input
                  type="tel"
                  class="form-control"
                  id="contactInfo"
                  name="contactInfo"
                  value={parentInfo.contactInfo}
                  onChange={handleParentInfoChange}
                  required={true}
                />
              </div>
              <div class="mb-3 i">
                <label for="homeAddress" class="form-label">
                  Home Address<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="homeAddress"
                  name="homeAddress"
                  value={parentInfo.homeAddress}
                  onChange={handleParentInfoChange}
                  required={true}
                />
              </div>
              <div class="mb-3 i">
                <label for="workAddress" class="form-label">
                  Work Address<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="worKddress"
                  name="workAddress"
                  value={parentInfo.workAddress}
                  onChange={handleParentInfoChange}
                  required={true}
                />
              </div>
              <div class="mb-3 i">
                <label for="emergencyContact" class="form-label">
                  Emergency Contact Info<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  class="form-control"
                  id="emergencyContactInfo"
                  //   name="parentName"
                  name="emergencyContactInfo"
                  value={parentInfo.emergencyContactInfo}
                  onChange={handleParentInfoChange}
                  required={true}
                />
              </div>
            </div>
          </div>

          <div className="">
            <h2 className="mb-3 mt-4">Authorized Pickup Persons</h2>
            <div className="form-container">
              <div class="mb-3 i">
                <label for="fullName" class="form-label">
                  Full Name<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="fullName"
                  name="fullName"
                  value={pickupPerson.fullName}
                  onChange={handlePickupPersonChange}
                  required={true}
                />
              </div>
              <div class="mb-3 i">
                <label for="parentName" class="form-label">
                  Relationship to child<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="RC"
                  name="relationship"
                  value={pickupPerson.relationship}
                  onChange={handlePickupPersonChange}
                  required={true}
                />
              </div>
              <div class="mb-3 i">
                <label for="phone" class="form-label">
                  Contact Info<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  class="form-control"
                  id="contactInfo"
                  name="contactInfo"
                  value={pickupPerson.contactInfo}
                  onChange={handlePickupPersonChange}
                  required={true}
                />
              </div>

              {/* <div class="mb-3 i">
                <label for="parentName" class="form-label">
                  Upload Photo ID:
                </label>
                <input
                  type="file"
                  class="form-control"
                  id="parentName"
                  //   name="parentName"
                  name="phone"
                  accept="image/*"
                  required
                  value={pickupPerson.photoID}
                  onChange={handlePickupPersonChange}
                />
              </div> */}
            </div>
          </div>
          <div className="mb-3 i">
            <h2 className="mt-4 mb-3">Type of Program</h2>
            <label for="lastName" class="form-label">
              program<span style={{ color: "red" }}>*</span>
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              value={program}
              required={true}
              onChange={handleProgramChange}
            >
              <option selected>Choose program</option>
              <option value="Play Group(1.5-2.5 yrs)">
                Play Group(1.5-2.5 yrs)
              </option>
              <option value="Nursery(2.5-3.5 yrs)">Nursery(2.5-3.5 yrs)</option>
              <option value="Lower KG(3.5-4.5 yrs)">
                Lower KG(3.5-4.5 yrs)
              </option>
              <option value="Upper KG(4.5-6 yrs)">Upper KG(4.5-6 yrs)</option>
            </select>
          </div>

          <div className="button-container">
            <button className="enroll-btn" disabled={loading}>
              Enroll
            </button>
            {loading && <Loading />}{" "}
            {/* Render the Loading component conditionally */}
          </div>

          {error && <Error error={error} />}
        </form>
      </div>
    </section>
  );
};

export default Enrollment;
