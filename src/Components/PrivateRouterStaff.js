import React from "react";

import { Navigate } from "react-router-dom";

function PrivateRouterStaff({ children }) {

  const auth = window.localStorage.getItem("staffInfo");
  return auth ? children : <Navigate to="/stafflogin" />;
}
export default PrivateRouterStaff;
