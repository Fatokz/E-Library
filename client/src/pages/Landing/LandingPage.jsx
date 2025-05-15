import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/General/Logo";
import logo2 from "../../assets/images/Logo2.svg";
import lms from "../../assets/images/dashboard.svg";
import library from "../../assets/images/library.png";
import Card from "../../components/Landing/Card";
import modern from "../../assets/images/modern.jpg";
import people from "../../assets/icons/people.svg";
import circulation from "../../assets/icons/circulation.svg";
import groupicon from "../../assets/icons/groupicon.svg";
import card from "../../assets/icons/card.svg";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import Button from "../../components/Landing/Button";
import { MoveRight } from "lucide-react";
import instagram from "../../assets/icons/instagram.svg";
import twitter from "../../assets/icons/twitter.svg";
import youtube from "../../assets/icons/youtube.svg";
import Input from "../../components/Landing/Input";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const goToRegister = () => {
    navigate("/register");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the state of the side dropdown menu
  };

  const CountUp = ({ targetNumber }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = targetNumber;
      const duration = 2; // Duration in seconds
      const increment = end / (duration * 60); // Update every frame

      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(interval);
          setCount(end); // Make sure the count ends exactly at the target
        } else {
          setCount(Math.floor(start)); // Update the state to re-render the count
        }
      }, 1000 / 60);

      return () => clearInterval(interval); // Cleanup on component unmount
    }, [targetNumber]);

    return (
      <motion.h3 className="font-medium text-darkgray">
        {count.toLocaleString()}
      </motion.h3>
    );
  };

  return (
    <>
      {/* Nav */}
      <nav
        className={`fixed top-0 z-50 w-full flex items-center justify-between 
          px-6 md:px-10 lg:px-30 transition-all duration-300 
          backdrop-blur-md
          ${scrolled ? "bg-white/70 py-2 shadow-xs" : "bg-silver py-4"}`}
      >
        <Logo />

        <div className="hidden md:block h-fit w-fit">
          <ul className="flex text-[14px] font-light gap-10 font-inter">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">Feature</li>
            <li className="cursor-pointer">Integrations</li>
            <li className="cursor-pointer">FAQ</li>
          </ul>
        </div>

        <div className="h-fit w-fit md:flex gap-4 hidden">
          <button className="p-1 text-primary text-[13px] cursor-pointer">
            Login
          </button>
          <button
            className="w-[70px] font-light text-[12px] px-3 bg-primary text-white py-1 rounded-[5px] cursor-pointer"
            onClick={goToRegister}
          >
            Sign up
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div
          className="cursor-pointer block md:hidden text-primary"
          onClick={toggleMenu}
        >
          {/* Conditionally render Menu or X icon */}
          {isOpen ? (
            <X size={24} /> // Show "X" when the menu is open
          ) : (
            <Menu size={24} /> // Show hamburger icon when the menu is closed
          )}
        </div>
      </nav>

      {/* Side dropdown menu */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        exit={{ x: "-100%" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          duration: 1.0,
        }}
        className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-20 md:hidden"
      >
        <div className="p-4 mt-15">
          <ul>
            <li className="py-2">
              <a href="#home">Home</a>
            </li>
            <li className="py-2">
              <a href="#feature">Feature</a>
            </li>
            <li className="py-2">
              <a href="#testimonial">Testimonial</a>
            </li>
            <li className="py-2">
              <a href="#faq">FAQ</a>
            </li>
          </ul>
          <div className="flex gap-4 mt-4">
            <button className="p-1 text-primary text-[13px]">Login</button>
            <button
              className="w-[70px] font-light text-[12px] px-3 bg-primary text-white py-1 rounded-[5px]"
              onClick={goToRegister}
            >
              Sign up
            </button>
          </div>
        </div>
      </motion.div>

      {/* Section 1 */}
      <motion.section
        className="md:h-[90vh] h-fit md:flex md:items-center md:justify-center w-full bg-silver px-10 md:px-10 lg:px-30"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-96 w-full flex items-center md:flex md:items-center md:gap-5">
          <div className="md:w-2/3 flex flex-col gap-6  md:flex md:flex-col md:gap-3">
            <h1 className="font-inter font-medium text-darkgray  md:text-6xl text-4xl">
              Effortless Library Management for{" "}
              <span className="text-primary">All Institutions</span>
            </h1>
            <p className="text-[12px] text-gray-500 font-medium">
              Track books, manage members, and automate borrowing in one
              seamless platform.
            </p>
            <button
              className="w-[70px] text-[12px] px-3 bg-primary text-white py-2 font-light rounded-[5px] cursor-pointer"
              onClick={goToRegister}
            >
              Register
            </button>
          </div>
          <div className="md:h-80 md:w-2/3 hidden md:block">
            <img src={lms} alt="dashboard" />
          </div>
        </div>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        className="h-fit md:h-[30vh] flex flex-col gap-3 py-5 px-10 md:px-10 lg:px-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="text-center">
          <h2 className="font-inter font-medium text-darkgray md:text-3xl text-2xl">
            Serving the Global Library Community
          </h2>
          <p className="text-[12px] text-gray-500 md:text-[14px]">
            Educational institutions, public libraries, and private centers all
            rely on us to manage their collections.
          </p>
        </div>
        <div className="h-18 w-full flex gap-4 md:gap-10 justify-center items-center">
          <motion.img
            src={library}
            alt=""
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.img
            src={library}
            alt=""
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.img
            src={library}
            alt=""
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.img
            src={library}
            alt=""
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          />
        </div>
      </motion.section>

      {/* Section 3 */}
      <section className="h-fit md:h-fit bg-silver py-5 px-10 md:px-10 lg:px-30">
        <div className="flex flex-col gap-10 justify-center">
          <div>
            <div className="flex flex-col gap-2 text-center items-center">
              <h2 className="md:w-[27rem] w-[20rem] font-inter font-medium text-darkgray md:text-3xl text-2xl">
                Manage Your Entire Library in One Seamless Platform
              </h2>
              <p className="text-[12px] text-gray-500 md:text-[14px]">
                Who is this system designed for?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-10">
            {/* First Card */}
            <motion.div
              whileHover={{
                scale: 1.05, // Slightly increase size
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)", // Add shadow on hover
                transition: { duration: 0.3 }, // Smooth transition
              }}
              className="cursor-pointer p-6 bg-white rounded-xl shadow-lg hover:shadow-xl"
            >
              <Card
                title="Public Libraries"
                number="1"
                text="Organize your entire catalog, automate returns, and engage your community with ease."
              />
            </motion.div>

            {/* Second Card */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 },
              }}
              className="cursor-pointer p-6 bg-white rounded-xl shadow-lg hover:shadow-xl"
            >
              <Card
                title="Schools & Universities"
                number="2"
                text="Streamline student access to resources, track borrowing, and manage digital and physical collections."
              />
            </motion.div>

            {/* Third Card */}
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 },
              }}
              className="cursor-pointer p-6 bg-white rounded-xl shadow-lg hover:shadow-xl"
            >
              <Card
                title="Private Institutions & Learning Centers"
                number="3"
                text="Efficiently manage books, members, and reports in one intuitive system tailored for small teams."
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="min-h-[60vh] w-full px-6 md:px-10 lg:px-30 py-8 flex items-center justify-center">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center max-w-6xl w-full">
          {/* Image Container */}
          <div className="w-full md:w-1/3 h-60 flex items-center justify-center">
            <img
              src={modern}
              alt="Modern Library"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Text Container */}
          <div className="w-full md:w-2/3 h-60 flex flex-col justify-center gap-4 py-4 ">
            <h2 className="text-2xl font-inter text-darkgray font-medium">
              Three Years of Supporting Modern Libraries
            </h2>
            <p className="text-sm text-[13px] text-gray-700">
              From local schools to national institutions, our journey has been
              shaped by real-world challenges and librarian feedback.
            </p>
            <button className="w-fit px-4 py-2 bg-primary cursor-pointer text-white text-sm rounded-[5px] font-light">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="min-h-[50vh] w-full flex items-center justify-center bg-silver px-6 md:px-10 lg:px-30">
        <div className="flex flex-col md:flex-row gap-5 w-full">
          {/* First Column */}
          <div className="md:h-60 w-full md:w-1/2">
            <div className="w-full p-5  flex flex-col gap-2">
              <h3 className="text-[20px] md:w-60 font-inter text-darkgray font-medium">
                Empowering Libraries Through Smart Management
              </h3>
              <p className="text-sm w-[90%] text-[13px] text-gray-700">
                Built with care and precision to support librarians, students,
                and communities
              </p>
            </div>
          </div>

          {/* Second Column */}
          {/* Second Column */}
          <div className="h-50 w-full md:w-1/2 grid grid-cols-2 items-center">
            <div className="h-20 w-[100%] flex items-center justify-center gap-4">
              <img src={people} alt="" className="size-6 md:size-10" />
              <div className="font-inter leading-tight">
                <CountUp targetNumber={2245341} />
                <p className="font-light text-[12px] text-gray-500">
                  Library Users
                </p>
              </div>
            </div>

            <div className="h-20 w-[100%] flex items-center justify-center gap-4">
              <img src={groupicon} alt="" className="size-6 md:size-10" />
              <div className="font-inter leading-tight">
                <CountUp targetNumber={46328} />
                <p className="font-light text-[12px] text-gray-500">
                  Reading Groups
                </p>
              </div>
            </div>

            <div className="h-20 w-[100%] flex items-center justify-center gap-4">
              <img src={circulation} alt="" className="size-6 md:size-10" />
              <div className="font-inter leading-tight">
                <CountUp targetNumber={828867} />
                <p className="font-light text-[12px] text-gray-500">
                  Library Circulation
                </p>
              </div>
            </div>

            <div className="h-20 w-[100%] flex items-center justify-center gap-4">
              <img src={card} alt="" className="size-6 md:size-10" />
              <div className="font-inter leading-tight">
                <CountUp targetNumber={1926436} />
                <p className="font-light text-[12px] text-gray-500">Payments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 */}
      <section className="min-h-[80vh] w-full px-6 md:px-10 lg:px-30 py-5">
        <div className="flex flex-col items-center gap-8">
          {/* Heading */}
          <div className="text-center max-w-md w-full">
            <h3 className="text-2xl md:text-3xl font-inter text-darkgray font-medium">
              Knowledge is for Sharing
            </h3>
            <p className="text-[12px] text-gray-500 mt-2">
              Explore our blog for the latest in library innovation, digital
              transformation tips, and real stories from librarians modernizing
              their workflows.
            </p>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
            {/* Card 1 */}
            <div className="group relative flex flex-col w-full overflow-hidden rounded-lg shadow-sm bg-white">
              <div className="w-full aspect-[4/3]">
                <img
                  src={image1}
                  alt="Blog 1"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-t-lg"
                />
              </div>
              <div className="flex flex-col gap-4 p-4 bg-silver group-hover:bg-gray-100 transition duration-300">
                <h4 className="text-sm font-medium text-darkgray">
                  How Small Libraries Are Going Digital Without Big Budgets
                </h4>
                <Button />
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative flex flex-col w-full overflow-hidden rounded-lg shadow-sm bg-white">
              <div className="w-full aspect-[4/3]">
                <img
                  src={image2}
                  alt="Blog 2"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-t-lg"
                />
              </div>
              <div className="flex flex-col gap-4 p-4 bg-silver group-hover:bg-gray-100 transition duration-300">
                <h4 className="text-sm font-medium text-darkgray">
                  Boosting Student Engagement Through Smart Cataloging
                </h4>
                <Button />
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative flex flex-col w-full overflow-hidden rounded-lg shadow-sm bg-white">
              <div className="w-full aspect-[4/3]">
                <img
                  src={image3}
                  alt="Blog 3"
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 rounded-t-lg"
                />
              </div>
              <div className="flex flex-col gap-4 p-4 bg-silver group-hover:bg-gray-100 transition duration-300">
                <h4 className="text-sm font-medium text-darkgray">
                  Stay On Top of Your Library Tasks with Our To-Do List
                </h4>
                <Button />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7 */}
      <section className="min-h-[35vh] w-full bg-silver px-6 md:px-10 lg:px-30 py-8">
        <div className="flex flex-col gap-5 justify-center items-center">
          <h3 className="text-2xl md:text-4xl text-center w-80 md:w-96 font-medium">
            Transform Your Library Operations Today
          </h3>

          <button
            className="w-fit justify-center items-center gap-2 flex text-[12px] px-3 bg-primary text-white py-2 font-light rounded-[5px] cursor-pointer"
            onClick={goToRegister}
          >
            Get Demo
            <MoveRight size={12} className="font-light" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="min-h-[50vh] w-full bg-footblack px-6 md:px-10 lg:px-30 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* First (Larger on lg) */}
          <div className="flex flex-col gap-8 h-62 p-2 sm:col-span-1 lg:col-span-2">
            <div className="flex items-center text-white gap-1">
              <img
                src={logo2}
                alt="BookSync Logo"
                className="md:size-10 size-8"
              />
              <p className="font-inter text-[12px] md:text-[14px] font-medium">
                BookSync
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-inter text-white text-[12px] font-light">
                Copyright © 2025 BookSync Ltd.
              </p>
              <p className="font-inter text-white text-[12px] font-light">
                All rights reserved
              </p>
            </div>
            <div className="flex gap-4">
              <img src={instagram} alt="Instagram" />
              <img src={twitter} alt="Twitter" />
              <img src={youtube} alt="YouTube" />
            </div>
          </div>

          {/* Second (Normal) */}
          <div className="h-62 p-2 sm:col-span-1 lg:col-span-1">
            <div className="flex flex-col gap-5">
              <p className="font-inter text-[14px] font-medium text-white">
                Company
              </p>
              <ul className="font-inter flex flex-col gap-3 text-white text-[12px] font-light">
                <li>About us</li>
                <li>Blog</li>
                <li>Contact us</li>
                <li>Pricing</li>
                <li>Testimonials</li>
              </ul>
            </div>
          </div>

          {/* Third (Normal) */}
          <div className="h-62 p-2 sm:col-span-1 lg:col-span-1">
            <div className="flex flex-col gap-5">
              <p className="font-inter text-[14px] font-medium text-white">
                Support
              </p>
              <ul className="font-inter flex flex-col gap-3 text-white text-[12px] font-light">
                <li>Help center</li>
                <li>Terms of service</li>
                <li>Legal</li>
                <li>Privacy policy</li>
                <li>Status</li>
              </ul>
            </div>
          </div>

          {/* Fourth (Larger on lg) */}
          <div className="h-62 p-2 sm:col-span-1 lg:col-span-2">
            <div className="flex flex-col gap-5">
              <p className="font-inter text-[14px] font-medium text-white">
                Stay up to date
              </p>
              <Input />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
