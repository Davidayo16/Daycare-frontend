// ***** GET ENROLLMENTS *********
import {
  COURSE_GET_FAIL,
  COURSE_GET_REQUEST,
  COURSE_GET_SUCCESS,
} from "./../Constants/CourseConstants";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});

export const getCourses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_GET_REQUEST });

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
      "/api/courses/courses-for-current-day",

      config
    );

    dispatch({ type: COURSE_GET_SUCCESS, payload: data });

    // localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: COURSE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
