import React, { useState, useEffect, useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import profile from "../../assets/images/ambassador.jpg";

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
    <div className="flex items-center gap-3 shadow-sm px-3 h-10 rounded-full border border-primary text-black text-xs whitespace-nowrap bg-white">
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

  useEffect(() => {
    function handleClickOutside(event) {
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
    <nav className="w-full gap-2 bg-white shadow-sm px-4 py-2 flex justify-between items-center flex-wrap relative z-50">
      {/* Left: Profile */}
      <div className=" flex items-center h-10 rounded-full border border-primary w-30 shadow-sm gap-2 px-2 cursor-pointer text-xs">
        <img
          src={profile}
          alt="profile"
          className="h-7 w-7 rounded-full object-cover"
        />
        <p className="font-medium text-black truncate">Admin</p>
        <MdArrowDropDown className="text-base text-black" />
      </div>

      {/* Center: Clock + Settings */}
      <div className="flex items-center gap-3">
        <ClockDateBadge />
        <button
          className="flex items-center justify-center h-10 w-10 rounded-full border border-primary text-primary shadow-sm"
          aria-label="Settings"
        >
          <FiSettings className="text-lg" />
        </button>
      </div>

      {/* Right: Hamburger for Mobile */}
      {/* <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="md:hidden text-2xl text-primary focus:outline-none"
        aria-label="Toggle menu"
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button> */}

      {/* Mobile Dropdown */}
      {/* {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 mt-1 flex flex-col gap-3 md:hidden z-50 bg-white shadow-lg border border-primary rounded-md p-4"
        >
          <div className="flex items-center h-10 rounded-full border border-primary w-full shadow-sm gap-2 px-3 cursor-pointer text-xs">
            <img
              src={profile}
              alt="profile"
              className="h-7 w-7 rounded-full object-cover"
            />
            <p className="font-medium text-black truncate">Admin</p>
            <MdArrowDropDown className="text-base text-black" />
          </div>
        </div>
      )} */}
    </nav>
  );
};

export default Nav;
