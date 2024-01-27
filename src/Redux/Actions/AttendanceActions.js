import axios from "axios";
import { ATTENDANCE_GET_FAIL, ATTENDANCE_GET_REQUEST, ATTENDANCE_GET_SUCCESS, ATTENDANCE_MARK_FAIL, ATTENDANCE_MARK_REQUEST, ATTENDANCE_MARK_SUCCESS } from './../Constants/AttendanceConstants';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});

export const getAttendance = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ATTENDANCE_GET_REQUEST });

    const {
      childLogin: { childInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${childInfo.token}`,
      },
    };

    const { data } = await api.get(
      "/api/attendance/attendance-history",

      config
    )

    dispatch({ type: ATTENDANCE_GET_SUCCESS, payload: data });

    // localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ATTENDANCE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const markAttendancee = (courseId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ATTENDANCE_MARK_REQUEST});

    const {
      childLogin: { childInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${childInfo.token}`,
      },
    };

    const { data } = await api.post(
      `/api/attendance/mark-attendance/${courseId}`,

      config
    );

    dispatch({ type: ATTENDANCE_MARK_SUCCESS, payload: data });

    // localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ATTENDANCE_MARK_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};