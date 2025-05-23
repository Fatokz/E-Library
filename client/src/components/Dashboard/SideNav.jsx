// import React from "react";
// import { NavLink } from "react-router-dom";
// import Logo from "../General/Logo";
// import { RiDashboardHorizontalFill } from "react-icons/ri";
// import { IoIosSearch } from "react-icons/io";
// import { RiBookShelfFill } from "react-icons/ri";
// import { BiLogOut } from "react-icons/bi";

// const SideNav = () => {
//   const linkClasses = ({ isActive }) =>
//     `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//       isActive
//         ? "bg-primary text-white"
//         : "text-gray-700 hover:bg-primary/10 hover:text-primary"
//     }`;

//   return (
//     <nav className="w-60 bg-white shadow-md p-4 flex flex-col justify-between min-h-screen">
//       {/* Logo and main links */}
//       <div>
//         <div className="mb-14">
//           <Logo />
//         </div>
//         <ul className="space-y-2">
//           <li>
//             <NavLink to="/dashboard" end className={linkClasses}>
//               <RiDashboardHorizontalFill className="text-lg" />
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/search" className={linkClasses}>
//               <IoIosSearch className="text-lg" />
//               Search
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/dashboard/shelf" className={linkClasses}>
//               <RiBookShelfFill className="text-lg" />
//               My Shelf
//             </NavLink>
//           </li>
//         </ul>
//       </div>

//       {/* Logout link at the bottom */}
//       <ul>
//         <li>
//           <NavLink to="/logout" className={linkClasses}>
//             <BiLogOut className="text-lg" />
//             Log Out
//           </NavLink>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default SideNav;



import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../General/Logo";
import Logo2 from "../../assets/images/Logo.svg";
import { RiDashboardHorizontalFill, RiBookShelfFill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { LuListTodo } from "react-icons/lu";

const SideNav = () => {
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
      to: "/dashboard",
      icon: <RiDashboardHorizontalFill className={iconSize} />,
      label: "Home",
    },
    {
      to: "/dashboard/search",
      icon: <IoIosSearch className={iconSize} />,
      label: "Search",
    },
    {
      to: "/dashboard/shelf",
      icon: <RiBookShelfFill className={iconSize} />,
      label: "My Shelf",
    },
    {
      to: "/dashboard/todo",
      icon: <LuListTodo className={iconSize} />,
      label: "Todo",
    },
  ];

  return (
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
          <NavLink to="/logout" className={linkClasses}>
            <BiLogOut className={iconSize} />
            <span className="hidden md:inline">Log Out</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
