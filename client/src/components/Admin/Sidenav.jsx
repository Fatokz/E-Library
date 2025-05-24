// This component is a sidebar navigation menu for an admin dashboard.
// It includes links to different sections of the admin panel, such as Dashboard, Catalog, Books, and User.;
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../General/Logo";
import Logo2 from "../../assets/images/Logo.svg";
import { FaCompass } from "react-icons/fa";
import { RiDashboardHorizontalFill, RiBookShelfFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { IoBookSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";

const SideNav = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const confirmLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/signin";
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center md:justify-start justify-center gap-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors
     ${
       isActive
         ? "bg-primary text-white"
         : "text-gray-700 hover:bg-primary/10 hover:text-primary"
     }`;

  const iconSize = "text-xl";

  const navLinks = [
    {
      to: "/admin",
      icon: <RiDashboardHorizontalFill className={iconSize} />,
      label: "Dashboard",
    },
    {
      to: "/admin/catalog",
      icon: <FaCompass className={iconSize} />,
      label: "Catalog",
    },
    {
      to: "/admin/books",
      icon: <IoBookSharp className={iconSize} />,
      label: "Books",
    },
    {
      to: "/admin/user",
      icon: <FaUsers className={iconSize} />,
      label: "User",
    },
  ];

  return (
    <>
      <nav className="w-16 md:w-60 bg-white shadow-md p-4 flex flex-col justify-between max-h-screen transition-all duration-300">
        {/* Top Section */}
        <div>
          <div className="hidden mb-10 md:flex justify-center md:justify-start">
            <Logo />
          </div>
          <div className="mt-1 md:hidden mb-10 flex justify-center">
            <img src={Logo2} alt="" />
          </div>
          <ul className="space-y-3">
            {navLinks.map(({ to, icon, label }) => (
              <li key={to}>
                <NavLink to={to} end className={linkClasses}>
                  {icon}
                  <span className="hidden md:inline">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Section */}
        <ul>
          <li>
            <NavLink
              to="#"
              onClick={handleLogout}
              className="flex items-center md:justify-start text-gray-700 hover:bg-primary/10 hover:text-primary justify-center gap-2 px-2 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {/* <NavLink to="/logout" className={linkClasses}> */}
              <BiLogOut className={iconSize} />
              <span className="hidden md:inline">Log Out</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {showModal && (
        <div className="h-screen fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          {/* Modal Content */}
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideNav;
