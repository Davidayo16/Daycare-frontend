import React from "react";

import { Navigate } from "react-router-dom";

function PrivateRouter({ children }) {
  const auth = window.localStorage.getItem("parentInfo");
  return auth ? children : <Navigate to="/parentlogin" />;
}
export default PrivateRouter;
