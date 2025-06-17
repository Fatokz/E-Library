import React, { useState, useEffect, useRef } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { CiBarcode } from "react-icons/ci";
import { FaLanguage, FaRegClock } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import profile from "../../assets/images/user.png";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Clock + Date Component
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
    <div className="flex items-center gap-3 bg-white shadow-sm px-3 h-10 rounded-full border border-primary text-black text-xs whitespace-nowrap">
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
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userName = user?.name || localStorage.getItem("userName") || "User";

  const toggleMenu = () => setMenuOpen((open) => !open);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/books");
        setBooks(res.data);
      } catch (err) {
        // handle error if needed
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Filter books as user types
  const filteredBooks = books.filter((book) => {
    const query = searchQuery.toLowerCase();
    return (
      book.title?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query) ||
      book.category?.toLowerCase().includes(query) ||
      book.categoryTitle?.toLowerCase().includes(query)
    );
  });

  // Filter books for mobile search
  const filteredMobileBooks = books.filter((book) => {
    const query = mobileSearchQuery.toLowerCase();
    return (
      book.title?.toLowerCase().includes(query) ||
      book.author?.toLowerCase().includes(query) ||
      book.category?.toLowerCase().includes(query) ||
      book.categoryTitle?.toLowerCase().includes(query)
    );
  });

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
    <nav className="w-full px-4 py-2 flex items-center justify-between flex-wrap relative z-50">
      {/* LEFT SIDE (md+) */}
      <div className="hidden md:flex items-center gap-3 flex-1 min-w-0">
        {/* Search */}
        <form
          // onSubmit={handleSearch}
          className="relative flex items-center h-10 rounded-full border border-primary px-2 w-full max-w-xs bg-white shadow-sm"
        >
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-white text-xs font-medium cursor-pointer">
            <p>All</p>
            <MdArrowDropDown className="text-base" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="flex-1 px-2 py-1 bg-transparent outline-none text-xs min-w-0"
            autoComplete="off"
          />
          <button type="submit" className="flex items-center gap-1 text-black">
            <IoIosSearch className="cursor-pointer text-base text-primary" />
          </button>
          <div className="h-5 w-px bg-gray-200" />
          <CiBarcode className="cursor-pointer text-base text-primary" />

          {/* Dropdown results */}
          {showDropdown && searchQuery && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {loading ? (
                <div className="p-2 text-xs text-gray-500">Loading...</div>
              ) : filteredBooks.length === 0 ? (
                <div className="p-2 text-xs text-gray-500">No books found.</div>
              ) : (
                filteredBooks.slice(0, 5).map((book) => (
                  <div
                    key={book._id || book.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-xs"
                    onClick={() => {
                      navigate(
                        `/dashboard/search?q=${encodeURIComponent(book.title)}`
                      );
                      setShowDropdown(false);
                      setSearchQuery(book.title);
                    }}
                  >
                    <span className="font-semibold">{book.title}</span>
                    <span className="ml-2 text-gray-500">{book.author}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </form>

        {/* Language Selector */}
        <div className="flex items-center gap-2 h-10 px-3 rounded-full bg-white border border-primary text-black cursor-pointer text-xs shadow-sm">
          <FaLanguage className="text-primary" />
          <p>Lang</p>
          <MdArrowDropDown className="text-base" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 flex-shrink-0 w-full md:w-auto">
        <ClockDateBadge />

        {/* Hamburger Menu (mobile) */}
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="md:hidden text-2xl text-primary cursor-pointer focus:outline-none ml-auto"
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Profile Info (desktop) */}
        <div className="hidden md:flex h-10 rounded-full border border-primary w-fit shadow-sm items-center gap-2 px-2 cursor-pointer text-xs ml-4">
          <img
            src={profile}
            alt="profile"
            className="h-7 w-7 rounded-full object-cover"
          />
          <p className="font-medium text-black truncate">
            {userName}
          </p>
          <MdArrowDropDown className="text-base text-black" />
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="absolute top-full left-0 right-0 mt-1 flex flex-col gap-3 md:hidden bg-white shadow-lg border border-primary rounded-md p-4 z-40"
        >
          {/* Mobile Search */}
          <div className="flex flex-col w-full">
            <div className="flex items-center h-10 rounded-full border border-primary px-2 bg-white shadow-sm w-full">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-xs font-medium cursor-pointer">
                <p>All</p>
                <MdArrowDropDown className="text-base" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                className="flex-1 px-2 py-1 bg-transparent outline-none text-xs"
              />
              <div className="flex items-center gap-1 text-black">
                <IoIosSearch className="cursor-pointer text-base text-primary" />
                <div className="h-5 w-px bg-gray-200" />
                <CiBarcode className="cursor-pointer text-base text-primary" />
              </div>
            </div>
            {/* Mobile Dropdown Results */}
            {mobileSearchQuery && (
              <div className="bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="p-2 text-xs text-gray-500">Loading...</div>
                ) : filteredMobileBooks.length === 0 ? (
                  <div className="p-2 text-xs text-gray-500">
                    No books found.
                  </div>
                ) : (
                  filteredMobileBooks.slice(0, 5).map((book) => (
                    <div
                      key={book._id || book.id}
                      className="p-2 hover:bg-gray-100 cursor-pointer text-xs"
                      onClick={() => {
                        navigate(
                          `/dashboard/search?q=${encodeURIComponent(
                            book.title
                          )}`
                        );
                        setMenuOpen(false);
                        setMobileSearchQuery(book.title);
                      }}
                    >
                      <span className="font-semibold">{book.title}</span>
                      <span className="ml-2 text-gray-500">{book.author}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Mobile Language */}
          <div className="flex items-center gap-2 h-10 px-3 rounded-full border border-primary text-black cursor-pointer text-xs shadow-sm">
            <FaLanguage className="text-primary" />
            <p>Lang</p>
            <MdArrowDropDown className="text-base" />
          </div>

          {/* Mobile Profile */}
          <div className="flex items-center h-10 rounded-full bg-white border border-primary w-full shadow-sm gap-2 px-3 cursor-pointer text-xs">
            <img
              src={profile}
              alt="profile"
              className="h-7 w-7 rounded-full object-cover"
            />
            <p className="font-medium text-black truncate">
              {userName}
            </p>
            <MdArrowDropDown className="text-base text-black" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
