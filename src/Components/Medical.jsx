import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChildDetails, updateChild } from "../Redux/Actions/UserAction";
import {  toast } from "react-toastify";
import axios from "axios";
import Loading from "./Loading/Loading";
const Medical = ({ child, initialMedicalInfo }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  console.log(initialMedicalInfo?.allergies);
  const dispatch = useDispatch();
  const [medicalInfo, setMedicalInfo] = useState({
    allergies: initialMedicalInfo?.allergies,
    medicalConditions: initialMedicalInfo?.medicalConditions,
    otherFields: initialMedicalInfo?.otherFields || {},
  });
  console.log(medicalInfo["allergies"]);
  React.useEffect(() => {
    setMedicalInfo({
      allergies: initialMedicalInfo?.allergies,
      medicalConditions: initialMedicalInfo?.medicalConditions,
      otherFields: initialMedicalInfo?.otherFields || {},
    });
  }, [initialMedicalInfo]);

  const [newField, setNewField] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("allergies");

  const childUpdate = useSelector((state) => state.childUpdate);
  const { loading: updateLoading, childInfo } = childUpdate;

  //****** UPDATE USER FUNCTION****
  const handleAddField = async () => {
    try {
      setIsAdding(true);
      if (newField.trim() !== "") {
        const updatedMedicalInfo = {
          [selectedCategory]: [newField],
        };
        console.log(updatedMedicalInfo);
        await dispatch(updateChild(updatedMedicalInfo));
        await dispatch(getChildDetails());
        if (childInfo) {
          toast.success("Child Profile Updated!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsAdding(false);
        }
      }
      setNewField("");

      // Show Toast on successful update
    } catch (error) {
      // Handle error if the update fails
      console.log(error);
    }
  };

  // Function to handle deletion of a field
  // ... (previous code)

  // Function to handle deletion of a field
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
  });
  const handleDeleteField = async () => {
    try {
      if (selectedIndex !== null) {
        // Get the token from local storage or wherever it's stored in your app
        const userrString = localStorage.getItem("childInfo");
        const userr = JSON.parse(userrString);
        // Set the headers to include the token in the request
        const headers = {
          Authorization: `Bearer ${userr.token}`,
          "Content-Type": "application/json",
        };
        setIsDeleting(true);
        // Make a POST request to the backend to delete the item
        const response = await api.put(
          "/api/users/child-profile/delete",
          {
            field: selectedCategory,
            index: selectedIndex,
          },
          { headers } // Include the headers in the request
        );

        // Check if the deletion was successful and show a success message
        if (response.data) {
          toast.success("Field deleted successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsDeleting(false);
        }
        await dispatch(getChildDetails());
        // Reset the selected index after deletion
        setSelectedIndex(null);

        // You can also dispatch an action or perform any other necessary updates after deletion
        // dispatch(updateChild(response.data));
        // dispatch(getChildDetails());
      }
    } catch (error) {
      console.error("Error deleting field:", error);
      // Handle error if deletion fails
    }
  };

  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  // ... (previous code)

  const handleSelectIndex = (index) => {
    setSelectedIndex(index);
    setShowDeleteButtons(true);
  };

  const handleCancelDeletion = () => {
    setSelectedIndex(null);
    setShowDeleteButtons(false);
  };

  return (
    <section className="medical-section">
      <h2>Medical Information</h2>
      <div className="medical-info">
        <div className="category-selection">
          <button
            onClick={() => setSelectedCategory("allergies")}
            className={selectedCategory === "allergies" ? "active" : ""}
          >
            Allergies
          </button>
          <button
            onClick={() => setSelectedCategory("medicalConditions")}
            className={selectedCategory === "medicalConditions" ? "active" : ""}
          >
            Medical Conditions
          </button>
          {/* Add buttons for other categories */}
        </div>
        <ul className="field-list">
          {medicalInfo[selectedCategory]?.map((field, index) => (
            <li key={index}>
              <span>{field}</span>
              <div className="field-actions">
                {selectedIndex === index && showDeleteButtons ? (
                  isDeleting ? (
                    <Loading />
                  ) : (
                    <>
                      <button
                        onClick={handleCancelDeletion}
                        className="cancel-btn"
                        disabled={isDeleting}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeleteField(index)}
                        className="delete-btn"
                        disabled={isDeleting}
                      >
                        Delete
                      </button>
                    </>
                  )
                ) : (
                  <>
                    <button
                      onClick={() => handleSelectIndex(index)}
                      className="select-btn d-none d-sm-block"
                      disabled={isDeleting}
                    >
                      Select for Deletion
                    </button>
                    <span
                      className="material-symbols-outlined g-icon-delete d-block d-sm-none del-btn"
                      onClick={() => handleSelectIndex(index)}
                    >
                      delete
                    </span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="add-field">
          <input
            type="text"
            placeholder="Add new field"
            value={newField}
            onChange={(e) => setNewField(e.target.value)}
          />
          {!updateLoading && (
            <button onClick={handleAddField} disabled={updateLoading}>
              Add
            </button>
          )}
          {updateLoading && <Loading />}
        </div>
      </div>
    </section>
  );
};

export default Medical;
