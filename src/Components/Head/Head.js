import React from "react";
import { FaHeart, FaUser, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout } from "../../Redux/Actions/UserAction";
// import "./Head.css";
import { useSelector, useDispatch } from "react-redux";
import {
  IS_ACTIVE,
  IS_ACTIVE_SMALL,
} from "../../Redux/Constants/SidebarConstant";
const Head = ({ handleLogout, lastName, firstName }) => {
  const dispatch = useDispatch();
  const setSidebar = useSelector((state) => state.setSidebar);
  const { isSidebarActive } = setSidebar;

  const setSmallSidebar = useSelector((state) => state.setSmallSidebar);
  const { isSidebarActivee } = setSmallSidebar;
  console.log(isSidebarActivee);

  const handleBar = () => {
    dispatch({ type: IS_ACTIVE });
  };
  const openSidebr = () => {
    dispatch({ type: IS_ACTIVE_SMALL });
  };
  return (
    <div className="header-main ">
      <div className="container-xxl">
        <div className="d-flex justify-content-between align-items-center z">
          <svg
            className="d-none d-lg-block svg"
            onClick={() => handleBar()}
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g id="Menu / Menu_Alt_05">
                {" "}
                <path
                  id="Vector"
                  d="M5 17H13M5 12H19M11 7H19"
                  stroke="rgb(25, 154, 177)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <div className="d-block d-lg-none svg-c">
            <svg
              className="d-block d-lg-none svg"
              onClick={() => openSidebr()}
              width="40px"
              height="40px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <g id="Menu / Menu_Alt_05">
                  {" "}
                  <path
                    id="Vector"
                    d="M5 17H13M5 12H19M11 7H19"
                    stroke="rgb(25, 154, 177)"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>

          <h2 className="dashboard d-none d-md-block">Dashboard</h2>
          <div className="dropdownn">
            <button
              className="btn dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {firstName}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1 p-0">
              <li onClick={() => handleLogout()}>
                <Link className="dropdown-item">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
