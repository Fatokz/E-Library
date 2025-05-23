import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import { Toaster } from "sonner";
import Signin from "../pages/Auth/Signin";
import Splash from "../pages/Splash";
import Onboard from "../pages/Auth/Onboard";
import VerifyUser from "../pages/Auth/VerifyUser";
import Dashboard from "../pages/User/Dashboard";
import Home from "../pages/User/Home";
import Search from "../pages/User/Search";
import Shelf from "../pages/User/Shelf";
import TodoList from "../pages/User/TodoList";

const RoutesPage = () => {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/welcome" element={<LandingPage />} />
        <Route path="/signup" element={<Onboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify" element={<VerifyUser />} />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Home />} /> {/* /dashboard */}
          <Route path="search" element={<Search />} />
          <Route path="shelf" element={<Shelf />} />
          <Route path="todo" element={<TodoList />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;