import React from "react";

import { Navigate } from "react-router-dom";

function PrivateRouterChild({ children }) {
  const auth = window.localStorage.getItem("childInfo");
  return auth ? children : <Navigate to="/childlogin" />;
}
export default PrivateRouterChild;
