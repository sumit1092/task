// // import React, { useEffect, useState, useRef } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./Header.css"; // create a CSS file for styling

// // const Header = ({ setShowSidebar }) => {
// //   const [time, setTime] = useState("");
// //   const [date, setDate] = useState("");
// //   const [isOpen, setIsOpen] = useState(false);
// //   const modalRef = useRef(null);
// //   const iconRef = useRef(null);
// //   const navigate = useNavigate();

// //   const authUser = JSON.parse(localStorage.getItem("authUser")) || {};
// //   const userName = authUser.userName || "Guest";

// //   // Update clock & date
// //   useEffect(() => {
// //     const updateTime = () => {
// //       const now = new Date();
// //       setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
// //       setDate(
// //         now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
// //       );
// //     };
// //     updateTime();
// //     const timer = setInterval(updateTime, 60000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   // Close modal when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         modalRef.current && !modalRef.current.contains(event.target) &&
// //         iconRef.current && !iconRef.current.contains(event.target)
// //       ) {
// //         setIsOpen(false);
// //       }
// //     };
// //     if (isOpen) {
// //       document.addEventListener("mousedown", handleClickOutside);
// //     } else {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     }
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, [isOpen]);

// //   const toggleModal = () => setIsOpen((prev) => !prev);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     navigate("/");
// //   };

// //   return (
// //     <div className="header">
// //       <div className="left-section">
// //         <button className="menu-btn" onClick={setShowSidebar}>
// //           {/* menu name should be where i click on that button for example if i clcked on home in sidebar the name home should appear */}
// //           {/* dynamic name */}
// //           {/* write here */}
// //         </button>
// //       </div>

// //       <div className="right-section">
// //         <span className="time">{time}</span>
// //         <span className="date">{date}</span>
// //         <button className="punch-btn">Punch In</button>
// //         <div className="user-info" ref={iconRef} onClick={toggleModal}>
// //           <span>{userName}</span>
// //           <span className="user-icon">👤</span>
// //         </div>
// //         {isOpen && (
// //           <div className="logout-menu" ref={modalRef}>
// //             <div onClick={handleLogout}>
// //                Logout
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Header;
// import React, { useEffect, useState, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom"; // <-- add useLocation
// import "./Header.css";
// import dashboardLogo from "../../../assets/images/dashboardLogo.svg";
// import myTeamLogo from "../../../assets/images/teamLogo.svg";
// import myTaskLogo from "../../../assets/images/taskLogo.svg";
// import billingLogo from "../../../assets/images/dollar.svg";
// import settingsLogo from "../../../assets/images/settingLogo.svg";

// // same menuData as in Sidebar
// const menuData = [
//   {
//     id: 1,
//     sidebar: "home",
//     submenu: [
//       { id: 1, name: "Dashboard", link: "/dashboard", Icon: dashboardLogo },
//       { id: 2, name: "My Team", link: "/myteam", Icon: myTeamLogo },
//       { id: 3, name: "My Task", link: "/mytask", Icon: myTaskLogo },
//       { id: 4, name: "Billing", link: "/billing", Icon: billingLogo },
//       { id: 5, name: "Settings", link: "/settings", Icon: settingsLogo },
//     ],
//   },
// ];

// const Header = ({ setShowSidebar }) => {
//   const [time, setTime] = useState("");
//   const [date, setDate] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const modalRef = useRef(null);
//   const iconRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation(); // <-- get current route

//   const authUser = JSON.parse(localStorage.getItem("authUser")) || {};
//   const userName = authUser.userName || "Guest";

//   // find current menu name from route
//   const currentMenu =
//     menuData[0].submenu.find((item) => item.link === location.pathname)?.name ||
//     "Home";

//   // Update clock & date
//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
//       setDate(
//         now.toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//           year: "numeric",
//         })
//       );
//     };
//     updateTime();
//     const timer = setInterval(updateTime, 60000);
//     return () => clearInterval(timer);
//   }, []);

//   // Close modal when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         modalRef.current &&
//         !modalRef.current.contains(event.target) &&
//         iconRef.current &&
//         !iconRef.current.contains(event.target)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   const toggleModal = () => setIsOpen((prev) => !prev);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   return (
//     <div className="header">
//       <div className="left-section">
//         <button className="menu-btn" onClick={setShowSidebar}>
//           {currentMenu} {/* 👈 dynamic menu name */}
//         </button>
//       </div>

//       <div className="right-section">
//         <span className="time">{time}</span>
//         <span className="date">{date}</span>
//         <button className="punch-btn">Punch In</button>
//         <div className="user-info" ref={iconRef} onClick={toggleModal}>
//           <span>{userName}</span>
//           <span className="user-icon">👤</span>
//         </div>
//         {isOpen && (
//           <div className="logout-menu" ref={modalRef}>
//             <div onClick={handleLogout}>Logout</div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import { menuData } from "../../../MenuBar/Menu";

const Header = ({ setShowSidebar }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const iconRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const authUser = JSON.parse(localStorage.getItem("authUser")) || {};
  const userName = authUser.userName || "Guest";

  const currentMenu =
    menuData[0].submenu.find((item) => item.link === location.pathname)?.name ||
    "FFC";

  // clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      setDate(
        now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  // modal close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header">
      <div className="left-section">
        <button className="menu-btn" onClick={setShowSidebar}>
          {currentMenu} {/* ✅ dynamic */}
        </button>
      </div>

      <div className="right-section">
        <span className="time">{time}</span>
        <span className="date">{date}</span>
        <button className="punch-btn">Punch In</button>
        <div className="user-info" ref={iconRef} onClick={toggleModal}>
          <span>{userName}</span>
          <span className="user-icon">👤</span>
        </div>
        {isOpen && (
          <div className="logout-menu" ref={modalRef}>
            <div onClick={handleLogout}>Logout</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
