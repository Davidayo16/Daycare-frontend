import {
  ATTENDANCE_GET_REQUEST,
  ATTENDANCE_GET_SUCCESS,
  ATTENDANCE_MARK_FAIL,
  ATTENDANCE_MARK_REQUEST,
  ATTENDANCE_MARK_SUCCESS,
} from "../Constants/AttendanceConstants";
import { ATTENDANCE_GET_FAIL } from "./../Constants/AttendanceConstants";

// *****CHILD DETAILS
export const attendaceHistoryReducer = (state = { attendance: [] }, action) => {
  switch (action.type) {
    case ATTENDANCE_GET_REQUEST:
      return { ...state, loading: true };
    case ATTENDANCE_GET_SUCCESS:
      return { loading: false, attendance: action.payload };
    case ATTENDANCE_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const attendaceMarkReducer = (state = {}, action) => {
  switch (action.type) {
    case ATTENDANCE_MARK_REQUEST:
      return { ...state, loading: true };
    case ATTENDANCE_MARK_SUCCESS:
      return { loading: false, attendance: action.payload };
    case ATTENDANCE_MARK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
