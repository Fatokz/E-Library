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

// Admin routes
import SuperDashboard from "../pages/Admin/Dashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Catalog from "../pages/Admin/Catalog";
import Books from "../pages/Admin/Books";
import User from "../pages/Admin/User";
import ProtectedRoute from "./ProtectedRoute";
import Payment from "../pages/User/Payment";

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

        {/* Protected user dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="shelf" element={<Shelf />} />
            <Route path="todo" element={<TodoList />} />
            <Route path="payment" element={<Payment />} />
          </Route>
        </Route>

        {/* Protected admin dashboard */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<SuperDashboard />}>
            <Route index element={<AdminDashboard />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="books" element={<Books />} />
            <Route path="user" element={<User />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesPage;
