import { BILLING_GET_FAIL, BILLING_GET_REQUEST, BILLING_GET_SUCCESS, BILLING_HISTORY_FAIL, BILLING_HISTORY_REQUEST, BILLING_HISTORY_SUCCESS } from "../Constants/BillingConstants";


// *****CHILD DETAILS
export const billingDetailsReducer = (state = { }, action) => {
  switch (action.type) {
    case BILLING_GET_REQUEST:
      return { ...state, loading: true };
    case BILLING_GET_SUCCESS:
      return { loading: false, billing: action.payload };
    case BILLING_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const billingHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case BILLING_HISTORY_REQUEST:
      return { ...state, loading: true };
    case BILLING_HISTORY_SUCCESS:
      return { loading: false, billingHistory: action.payload };
    case BILLING_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};