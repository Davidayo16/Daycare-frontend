import { ENROLLMENT_DETAILS_FAIL, ENROLLMENT_DETAILS_REQUEST, ENROLLMENT_DETAILS_SUCCESS, ENROLLMENT_FAIL, ENROLLMENT_REQUEST, ENROLLMENT_SUCCESS } from "../Constants/EnrollmentConstants";
import {
 
  CHILD_DETAILS_FAIL,
  CHILD_DETAILS_REQUEST,
  CHILD_DETAILS_SUCCESS,
  CHILD_UPDATE_FAIL,
  CHILD_UPDATE_REQUEST,
  CHILD_UPDATE_SUCCESS,
  CHILD_USER_LOGIN_FAIL,
  CHILD_USER_LOGIN_REQUEST,
  CHILD_USER_LOGIN_SUCCESS,
  CHILD_USER_LOGOUT,
  PARENT_DETAILS_FAIL,
  PARENT_DETAILS_REQUEST,
  PARENT_DETAILS_SUCCESS,
  PARENT_REGISTER_FAIL,
  PARENT_REGISTER_REQUEST,
  PARENT_REGISTER_SUCCESS,
  PARENT_UPDATE_FAIL,
  PARENT_UPDATE_REQUEST,
  PARENT_UPDATE_RESET,
  PARENT_UPDATE_SUCCESS,
  PARENT_USER_LOGIN_FAIL,
  PARENT_USER_LOGIN_REQUEST, PARENT_USER_LOGIN_SUCCESS, PARENT_USER_LOGOUT, STAFF_DETAILS_FAIL, STAFF_DETAILS_REQUEST, STAFF_DETAILS_SUCCESS, STAFF_USER_LOGIN_FAIL, STAFF_USER_LOGIN_REQUEST, STAFF_USER_LOGIN_SUCCESS, STAFF_USER_LOGOUT,
} from "./../Constants/UserConstants";

export const parentLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case PARENT_USER_LOGIN_REQUEST:
      return { loading: true };
    case PARENT_USER_LOGIN_SUCCESS:
      return { loading: false, parentInfo: action.payload };

    case PARENT_USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case PARENT_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const enrollmentReducer = (state = {}, action) => {
  switch (action.type) {
    case ENROLLMENT_REQUEST:
      return { loading: true };
    case ENROLLMENT_SUCCESS:
      return { loading: false, enrollmentInfo: action.payload };

    case ENROLLMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const enrollmentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ENROLLMENT_DETAILS_REQUEST:
      return { loading: true };
    case ENROLLMENT_DETAILS_SUCCESS:
      return { loading: false, enrollmentDetailInfo: action.payload };

    case ENROLLMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const parentRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case PARENT_REGISTER_REQUEST:
      return { loading: true };
    case PARENT_REGISTER_SUCCESS:
      return { loading: false, parentInfo: action.payload };
    case PARENT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// *****PARENT DETAILS
export const parentDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case PARENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PARENT_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case PARENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
//********UPDATE USER DETAILS
export const parentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PARENT_UPDATE_REQUEST:
      return { loading: true };
    case PARENT_UPDATE_SUCCESS:
      return { loading: false, parentInfo: action.payload };
    case PARENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};




export const childLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_USER_LOGIN_REQUEST:
      return { loading: true };
    case CHILD_USER_LOGIN_SUCCESS:
      return { loading: false, childInfo: action.payload };

    case CHILD_USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case CHILD_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};


// *****CHILD DETAILS
export const childDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case CHILD_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CHILD_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case CHILD_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//********UPDATE CHILD DETAILS
export const childUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_UPDATE_REQUEST:
      return { loading: true };
    case CHILD_UPDATE_SUCCESS:
      return { loading: false, childInfoUpdate: action.payload };
    case CHILD_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


export const staffLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_USER_LOGIN_REQUEST:
      return { loading: true };
    case STAFF_USER_LOGIN_SUCCESS:
      return { loading: false, staffInfo: action.payload };

    case STAFF_USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};


export const staffDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case STAFF_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STAFF_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case STAFF_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};