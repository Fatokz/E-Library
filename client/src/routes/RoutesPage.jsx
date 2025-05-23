import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import { Toaster } from "sonner";
import Signin from "../pages/Auth/Signin";
import Splash from "../pages/Splash";
import Onboard from "../pages/Auth/Onboard";
import VerifyUser from "../pages/Auth/VerifyUser";

const RoutesPage = () => {
  return (
    <>
      <Router>
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" index element={<Splash />} />
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/onboard" element={<Onboard />} /> 
          <Route path="/signin" element={<Signin />} />
          <Route path="/verify" element={<VerifyUser />} /> 
        </Routes>
      </Router>
    </>
  );
};

export default RoutesPage;