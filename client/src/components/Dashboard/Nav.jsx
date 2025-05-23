// import React, { useState, useEffect } from "react";
// import { MdArrowDropDown } from "react-icons/md";
// import { IoIosSearch } from "react-icons/io";
// import { CiBarcode } from "react-icons/ci";
// import { FaLanguage, FaRegClock } from "react-icons/fa6";
// import { FaRegCalendarAlt } from "react-icons/fa";
// import profile from "../../assets/images/ambassador.jpg"

// // Clock + Date Component
// const ClockDateBadge = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (date) =>
//     date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   const formatDate = (date) =>
//     date
//       .toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       })
//       .toUpperCase()
//       .replace(/ /g, "-");

//   return (
//     <div className="flex items-center gap-4 shadow-sm px-4 h-10 w-60 rounded-full border border-primary text-black font-orbitron text-[11px]">
//       <div className="flex items-center gap-1">
//         <FaRegClock className="text-primary" />
//         <span>{formatTime(time)}</span>
//       </div>
//       <div className="flex items-center gap-1 ">
//         <FaRegCalendarAlt className="text-primary" />
//         <span>{formatDate(time)}</span>
//       </div>
//     </div>
//   );
// };

// // NavBar Component
// const Nav = () => {
//   return (
//     <nav className="w-full h-14 bg-white shadow-xs px-5 flex items-center justify-between">
//       {/* Search Box */}
//       <div className="flex items-center h-10 rounded-full border border-primary px-2 w-82 bg-white shadow-sm">
//         <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium cursor-pointer">
//           <p>All</p>
//           <MdArrowDropDown className="text-lg" />
//         </div>
//         <input
//           type="text"
//           placeholder="Search..."
//           className="flex-1 px-3 py-1 bg-transparent outline-none text-sm"
//         />
//         <div className="flex items-center gap-2 text-black">
//           <IoIosSearch className="cursor-pointer text-lg text-primary" />
//           <div className="h-5 w-px bg-gray-200" />
//           <CiBarcode className="cursor-pointer text-lg text-primary" />
//         </div>
//       </div>

//       {/* Language Selector */}
//       <div className="flex items-center justify-between shadow-sm gap-2 h-10 px-4 rounded-full border border-primary text-black w-30 cursor-pointer">
//         <FaLanguage className="text-sm text-primary" />
//         <p className="text-sm font-medium">Lang</p>
//         <MdArrowDropDown className="text-lg" />
//       </div>

//       {/* Clock + Date */}
//       <ClockDateBadge />

//       {/* Placeholder (could be user avatar, notifications etc.) */}
//       <div className="h-10 rounded-full border border-primary w-40 shadow-sm flex items-center gap-2 px-2 cursor-pointer">
//         <img
//           src={profile}
//           alt="profile"
//           className="h-7 w-7 rounded-full bg-black object-cover"
//         />
//         <p className="text-sm font-medium text-black">Ambassador</p>
//         <MdArrowDropDown className="text-lg text-black" />
//       </div>
//     </nav>
//   );
// };

// export default Nav;


import React, { useState, useEffect, useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { CiBarcode } from "react-icons/ci";
import { FaLanguage, FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import profile from "../../assets/images/ambassador.jpg";

// Clock + Date Component (unchanged)
const ClockDateBadge = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDate = (date) =>
    date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .toUpperCase()
      .replace(/ /g, "-");

  return (
    <div className="flex items-center gap-3 shadow-sm px-3 h-10 rounded-full border border-primary text-black text-xs whitespace-nowrap">
      <div className="flex items-center gap-1">
        <FaRegClock className="text-primary" />
        <span className="text-[12px]">{formatTime(time)}</span>
      </div>
      <div className="flex items-center gap-1">
        <FaRegCalendarAlt className="text-primary" />
        <span className="text-[12px]">{formatDate(time)}</span>
      </div>
    </div>
  );
};

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => setMenuOpen((open) => !open);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      // If click is NOT inside menu or hamburger button, close menu
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="w-full bg-white shadow-sm px-4 py-2 flex items-center justify-between flex-wrap relative z-50">
      {/* LEFT: Search & Language on md+ */}
      <div className="hidden md:flex items-center gap-3 flex-1 min-w-0">
        {/* Search */}
        <div className="flex items-center h-10 rounded-full border border-primary px-2 w-full max-w-xs bg-white shadow-sm">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-xs font-medium cursor-pointer">
            <p>All</p>
            <MdArrowDropDown className="text-base" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 px-2 py-1 bg-transparent outline-none text-xs"
          />
          <div className="flex items-center gap-1 text-black">
            <IoIosSearch className="cursor-pointer text-base text-primary" />
            <div className="h-5 w-px bg-gray-200" />
            <CiBarcode className="cursor-pointer text-base text-primary" />
          </div>
        </div>

        {/* Language */}
        <div className="flex items-center gap-2 h-10 px-3 rounded-full border border-primary text-black cursor-pointer text-xs shadow-sm">
          <FaLanguage className="text-primary" />
          <p>Lang</p>
          <MdArrowDropDown className="text-base" />
        </div>
      </div>

      {/* RIGHT: Clock, Hamburger */}
      <div className="flex items-center gap-4 flex-shrink-0 w-full md:w-auto">
        <ClockDateBadge />

        {/* Hamburger: aligned far right on mobile */}
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="md:hidden text-2xl text-primary focus:outline-none ml-auto"
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Profile on md+ only */}
        <div className="hidden md:flex h-10 rounded-full border border-primary w-36 shadow-sm items-center gap-2 px-2 cursor-pointer text-xs ml-4">
          <img
            src={profile}
            alt="profile"
            className="h-7 w-7 rounded-full object-cover"
          />
          <p className="font-medium text-black truncate">Ambassador</p>
          <MdArrowDropDown className="text-base text-black" />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 mt-1 flex flex-col gap-3 md:hidden z-50 bg-white shadow-lg border border-primary rounded-md p-4"
          style={{ minWidth: "100%" }}
        >
          {/* Search */}
          <div className="flex items-center h-10 rounded-full border border-primary px-2 bg-white shadow-sm w-full">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-xs font-medium cursor-pointer">
              <p>All</p>
              <MdArrowDropDown className="text-base" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-2 py-1 bg-transparent outline-none text-xs"
            />
            <div className="flex items-center gap-1 text-black">
              <IoIosSearch className="cursor-pointer text-base text-primary" />
              <div className="h-5 w-px bg-gray-200" />
              <CiBarcode className="cursor-pointer text-base text-primary" />
            </div>
          </div>

          {/* Language */}
          <div className="flex items-center gap-2 h-10 px-3 rounded-full border border-primary text-black cursor-pointer text-xs shadow-sm">
            <FaLanguage className="text-primary" />
            <p>Lang</p>
            <MdArrowDropDown className="text-base" />
          </div>

          {/* Profile inside dropdown */}
          <div className="flex items-center h-10 rounded-full border border-primary w-full shadow-sm gap-2 px-3 cursor-pointer text-xs">
            <img
              src={profile}
              alt="profile"
              className="h-7 w-7 rounded-full object-cover"
            />
            <p className="font-medium text-black truncate">Ambassador</p>
            <MdArrowDropDown className="text-base text-black" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
