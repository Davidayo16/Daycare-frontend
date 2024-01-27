import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./Components/scrollToTop";
import Layout from "./Components/Layout";
import PrivateRouter from "./Components/PrivateRouter";
import PrivateRouterChild from "./Components/PrivateRouterChild";
import PrivateRouterStaff from "./Components/PrivateRouterStaff";
import LazyLoading from "./Components/Loading/LazyLoading";
const Home = lazy(() => import("./Pages/Home/Home"));
const StaffProfile = lazy(() => import("./Pages/StaffProfile/StaffProfile"));
const ChildProfile = lazy(() => import("./Pages/ChildProfile/ChildProfile"));
const ParentProfile = lazy(() => import("./Pages/ParentProfile/ParentProfile"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const ParentLogin = lazy(() => import("./Pages/Login/ParentLogin"));
const ParentRegister = lazy(() => import("./Pages/Register/ParentRegister"));
const About = lazy(() => import("./Pages/About/About"));
const ChildLogin = lazy(() => import("./Pages/Login/ChildLogin"));
const StaffLogin = lazy(() => import("./Pages/Login/StaffLogin"));
const SuccessPage = lazy(() => import("./Pages/SuccessPage/SuccessPage"));
const Enrollment = lazy(() => import("./Pages/Enrollment/Enrollment"));


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const parts = location.pathname.split("/");
    const uniqueToken = parts[2];

    // Call the server to validate the token
    fetch(`/api/validate-token/${uniqueToken}`)
      .then((response) => response.json())
      .then((data) => setIsValidToken(data.valid))
      .catch((error) => {
        console.error("Error validating token:", error);
        setIsValidToken(false);
      });
  }, [location.pathname]);

  return (
    <div className="App">
      <ScrollToTop>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LazyLoading />}>
                <Layout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<LazyLoading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/enrol"
              element={
                <PrivateRouter>
                  <Suspense fallback={<LazyLoading />}>
                    <Enrollment />
                  </Suspense>
                </PrivateRouter>
              }
            />
            <Route
              path="/parentlogin"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <ParentLogin />
                </Suspense>
              }
            />
            <Route
              path="/childlogin"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <ChildLogin />
                </Suspense>
              }
            />
            <Route
              path="/parentregister"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <ParentRegister />
                </Suspense>
              }
            />
            <Route
              path="/stafflogin"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <StaffLogin />
                </Suspense>
              }
            />
            <Route
              path="/staffprofile"
              element={
                <PrivateRouterStaff>
                  <Suspense fallback={<LazyLoading />}>
                    <StaffProfile />
                  </Suspense>
                </PrivateRouterStaff>
              }
            />
            <Route
              path="/childprofile"
              element={
                <PrivateRouterChild>
                  <Suspense fallback={<LazyLoading />}>
                    <ChildProfile />
                  </Suspense>
                </PrivateRouterChild>
              }
            />
            <Route
              path="/success/:uniqueToken/billingId?"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <SuccessPage />
                </Suspense>
              }
            />
            <Route
              path="/parentprofile"
              element={
                <PrivateRouter>
                  <Suspense fallback={<LazyLoading />}>
                    <ParentProfile />
                  </Suspense>
                </PrivateRouter>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<LazyLoading />}>
                  <About />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
