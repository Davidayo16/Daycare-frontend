import { COURSE_GET_FAIL, COURSE_GET_REQUEST, COURSE_GET_SUCCESS } from "../Constants/CourseConstants";

// *****CHILD DETAILS
export const courseDetailsReducer = (state = { courses:[]}, action) => {
  switch (action.type) {
    case COURSE_GET_REQUEST:
      return { ...state, loading: true };
    case COURSE_GET_SUCCESS:
      return { loading: false, courses: action.payload };
    case COURSE_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
