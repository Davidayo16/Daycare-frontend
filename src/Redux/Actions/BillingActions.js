
import axios from "axios";
import { BILLING_GET_FAIL, BILLING_GET_REQUEST, BILLING_GET_SUCCESS, BILLING_HISTORY_FAIL, BILLING_HISTORY_REQUEST, BILLING_HISTORY_SUCCESS } from "../Constants/BillingConstants";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your environment variable name
});
export const getBillingHistory = (childId) => async (dispatch, getState) => {
  console.log(childId)
  try {
    dispatch({ type: BILLING_HISTORY_REQUEST });

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
        `/api/billing/billing/history/${childId}`,
    
       config 
    );

    dispatch({ type: BILLING_HISTORY_SUCCESS, payload: data });

    // localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: BILLING_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBilling = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BILLING_GET_REQUEST });

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
      `/api/billing/billing/${id}`,
      config
    );

    dispatch({ type: BILLING_GET_SUCCESS, payload: data });

    // localStorage.setItem("parentInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: BILLING_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


