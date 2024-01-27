import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  childDetailsReducer,
  childLoginReducer,
  childUpdateReducer,
  enrollmentDetailsReducer,
  enrollmentReducer,
  parentDetailsReducer,
  parentLoginReducer,
  parentRegisterReducer,
  parentUpdateReducer,
  staffDetailsReducer,
  staffLoginReducer,
} from "./Reducers/UserReducers";
import { courseDetailsReducer } from "./Reducers/CourseReducer";
import { attendaceHistoryReducer, attendaceMarkReducer } from "./Reducers/AttendanceReducer";
import { billingDetailsReducer, billingHistoryReducer } from "./Reducers/BillingReducer";
import { sideBarReucer, smallSideBarReducer } from './Reducers/SidebarReducer/SidebarReducer';

const reducer = combineReducers({
  parentLogin: parentLoginReducer,
  parentRegister: parentRegisterReducer,
  parentDetails: parentDetailsReducer,
  enrollmentDetails: enrollmentReducer,
  enrolled: enrollmentDetailsReducer,
  parentUpdate: parentUpdateReducer,
  childLogin: childLoginReducer,
  childDetails: childDetailsReducer,
  courseDetails: courseDetailsReducer,
  childUpdate: childUpdateReducer,
  attendanceHistory: attendaceHistoryReducer,
  attendanceMark: attendaceMarkReducer,
  staffLogin: staffLoginReducer,
  staffDetails: staffDetailsReducer,
  billingDetails: billingDetailsReducer,
  billingHistoryy: billingHistoryReducer,
  setSidebar: sideBarReucer,
  setSmallSidebar: smallSideBarReducer,
});
const parentInfoFromLocalStorage = localStorage.getItem("parentInfo")
  ? JSON.parse(localStorage.getItem("parentInfo"))
  : null;

  const childInfoFromLocalStorage = localStorage.getItem("childInfo")
  ? JSON.parse(localStorage.getItem("childInfo"))
  : null;

  
  const staffInfoFromLocalStorage = localStorage.getItem("staffInfo")
    ? JSON.parse(localStorage.getItem("staffInfo"))
    : null;


const innitialState = {
  parentLogin: {
    parentInfo: parentInfoFromLocalStorage,
  },
  childLogin: {
    childInfo: childInfoFromLocalStorage,
  },
  staffLogin: {
    staffInfo: staffInfoFromLocalStorage,
  },
};
const Middleware = [thunk];
const store = createStore(
  reducer,
  innitialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);

export default store;
