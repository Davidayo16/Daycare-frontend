import axios from "axios";

import { useNavigate } from "react-router-dom";
import {
  PARENT_DETAILS_REQUEST,
  PARENT_USER_LOGIN_FAIL,
  PARENT_USER_LOGIN_REQUEST,
  PARENT_USER_LOGIN_SUCCESS,
  PARENT_DETAILS_SUCCESS,
  PARENT_DETAILS_FAIL,
  PARENT_UPDATE_REQUEST,
  PARENT_UPDATE_SUCCESS,
  PARENT_UPDATE_FAIL,
  PARENT_REGISTER_SUCCESS,
  PARENT_REGISTER_REQUEST,
  PARENT_REGISTER_FAIL,
  PARENT_USER_LOGOUT,
  CHILD_USER_LOGIN_SUCCESS,
  CHILD_USER_LOGIN_REQUEST,
  CHILD_USER_LOGIN_FAIL,
  CHILD_DETAILS_REQUEST,
  CHILD_DETAILS_FAIL,
  CHILD_DETAILS_SUCCESS,
  CHILD_UPDATE_REQUEST,
  CHILD_UPDATE_SUCCESS,
  CHILD_UPDATE_FAIL,
  CHILD_USER_LOGOUT,
  STAFF_REGISTER_REQUEST,
  STAFF_REGISTER_SUCCESS,
  STAFF_USER_LOGIN_SUCCESS,
  STAFF_REGISTER_FAIL,
  STAFF_USER_LOGIN_REQUEST,
  STAFF_DETAILS_REQUEST,
  STAFF_DETAILS_SUCCESS,
  STAFF_USER_LOGOUT,
  STAFF_DETAILS_FAIL,
  STAFF_USER_LOGIN_FAIL,
} from "./../Constants/UserConstants";
import {
  ENROLLMENT_DETAILS_FAIL,
  ENROLLMENT_DETAILS_REQUEST,
  ENROLLMENT_DETAILS_SUCCESS,
  ENROLLMENT_FAIL,
  ENROLLMENT_REQUEST,
  ENROLLMENT_SUCCESS,
} from "../Constants/EnrollmentConstants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});

//******PARENT LOGIN*****
export const parentLog = (email, password) => async (dispatch) => {
  try {
    console.log("email", email, "pass", password);
    dispatch({ type: PARENT_USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(
      "/api/users/parent-login",
      { email, password },
      config
    );
    console.log(data);

    dispatch({ type: PARENT_USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: PARENT_USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//******PARENT REGISTER*****
export const registerParent =
  (firstName, lastName, email, password) => async (dispatch) => {
    try {
      dispatch({ type: PARENT_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await api.post(
        "/api/users/parent-register",
        { firstName, lastName, email, password },
        config
      );
      dispatch({ type: PARENT_REGISTER_SUCCESS, payload: data });
      dispatch({ type: PARENT_USER_LOGIN_SUCCESS, payload: data }); // Optionally, log in the newly registered parent automatically
      localStorage.setItem("parentInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: PARENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

//**** PARENT DETAILS
export const getParentDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PARENT_DETAILS_REQUEST });
    const {
      parentLogin: { parentInfo },
    } = getState();
    console.log(parentInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${parentInfo.token}`,
      },
    };
    const { data } = await api.get(`/api/users/parent-profile`, config);
    dispatch({ type: PARENT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: PARENT_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("parentInfo");
  dispatch({ type: PARENT_USER_LOGOUT });
  document.location.href = "/parentlogin";
};
export const logoutChild = () => (dispatch) => {
  localStorage.removeItem("childInfo");
  dispatch({ type: CHILD_USER_LOGOUT });
  document.location.href = "/childlogin";
};
export const logoutStaff = () => (dispatch) => {
  localStorage.removeItem("staffInfo");
  dispatch({ type: STAFF_USER_LOGOUT });
  document.location.href = "/stafflogin";
};
//******ENROLLMENT*****
export const enroll = (enrollmentData) => async (dispatch, getState) => {
  try {
    dispatch({ type: ENROLLMENT_REQUEST });

    const {
      parentLogin: { parentInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parentInfo.token}`,
      },
    };

    const { data } = await axios.post(
      "/api/users/enroll",
      enrollmentData,
      config
    );

    dispatch({ type: ENROLLMENT_SUCCESS, payload: data });

    // localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ENROLLMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ***** GET ENROLLMENTS *********
export const getEnroll = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ENROLLMENT_DETAILS_REQUEST });

    const {
      parentLogin: { parentInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parentInfo.token}`,
      },
    };

    const { data } = await api.get(
      "/api/users/enrollments",

      config
    );

    dispatch({ type: ENROLLMENT_DETAILS_SUCCESS, payload: data });

    // localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ENROLLMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//**** UPDATE PROFILE
export const updateParent = (user) => async (dispatch, getState) => {
  console.log(user);
  try {
    dispatch({ type: PARENT_UPDATE_REQUEST });
    const {
      parentLogin: { parentInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${parentInfo.token}`,
      },
    };
    const { data } = await api.put("/api/users/parent-profile", user, config);
    console.log(data);
    dispatch({ type: PARENT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PARENT_USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("parentInfo", JSON.stringify(data));
    console.log(data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, token failed") {
      dispatch(logout());
    }
    if (message === "Not Authorized, no token") {
      dispatch(logout());
    }
    dispatch({
      type: PARENT_UPDATE_FAIL,
      payload: message,
    });
  }
};




//******CHILD LOGIN*****
export const childLog = (email, password) => async (dispatch) => {
  try {
    console.log("email", email, "pass", password);
    dispatch({ type: CHILD_USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(
      "/api/users/child-login",
      { email, password },
      config
    );
    console.log(data);

    dispatch({ type: CHILD_USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("childInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CHILD_USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



//**** CHILD DETAILS
export const getChildDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CHILD_DETAILS_REQUEST });
    const {
      childLogin: { childInfo },
    } = getState();
    console.log(childInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${childInfo.token}`,
      },
    };
    const { data } = await api.get(`/api/users/child-profile`, config);
    dispatch({ type: CHILD_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, no token") {
      dispatch(logoutChild());
    }
    dispatch({
      type: CHILD_DETAILS_FAIL,
      payload: message,
    });
  }
};



//**** UPDATE CHILD PROFILE
export const updateChild = (user) => async (dispatch, getState) => {
  console.log(user);
  try {
    dispatch({ type: CHILD_UPDATE_REQUEST });
    const {
      childLogin: { childInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${childInfo.token}`,
      },
    };
    const { data } = await api.put("/api/users/child-profile", user, config);
    console.log(data);
    dispatch({ type: CHILD_UPDATE_SUCCESS, payload: data });
    dispatch({ type: CHILD_USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("childInfo", JSON.stringify(data));
    console.log(data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, token failed") {
      dispatch(logoutChild());
    }
    if (message === "Not Authorized, no token") {
      dispatch(logoutChild());
    }
    dispatch({
      type: CHILD_UPDATE_FAIL,
      payload: message,
    });
  }
};



//******STAFF REGISTER*****
export const staffRegister =
  (firstName, lastName, email, password, position, department) => async (dispatch) => {
    try {
      dispatch({ type: STAFF_REGISTER_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await api.post(
        "/api/users/staff-register",
        { firstName, lastName, email, password,  position, department },
        config
      );
      dispatch({ type: STAFF_REGISTER_SUCCESS, payload: data });
      dispatch({ type: STAFF_USER_LOGIN_SUCCESS, payload: data }); // Optionally, log in the newly registered parent automatically
      localStorage.setItem("staffInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: STAFF_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  //******STAFF LOGIN*****
export const staffLog = (email, password) => async (dispatch) => {
  try {
 
    dispatch({ type: STAFF_USER_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await api.post(
      "/api/users/staff-login",
      { email, password },
      config
    );
    console.log(data);

    dispatch({ type: STAFF_USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("staffInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: STAFF_USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getStaffDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STAFF_DETAILS_REQUEST });
    const {
      staffLogin: { staffInfo },
    } = getState();
    console.log(staffInfo.token);
    const config = {
      headers: {
        Authorization: `Bearer ${staffInfo.token}`,
      },
    };
    const { data } = await api.get(`/api/users/staff-profile`, config);
    dispatch({ type: STAFF_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not Authorized, no token") {
      dispatch(logoutStaff());
    }
    dispatch({
      type: STAFF_DETAILS_FAIL,
      payload: message,
    });
  }
};