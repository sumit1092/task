// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import "./Sidebar.css";
// import dashboardLogo from "../../../assets/images/dashboardLogo.svg";
// import myTeamLogo from "../../../assets/images/teamLogo.svg";
// import myTaskLogo from "../../../assets/images/taskLogo.svg";
// import billingLogo from "../../../assets/images/dollar.svg";
// import settingsLogo from "../../../assets/images/settingLogo.svg";

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

// const Sidebar = ({ hideSidebar, handleCompressSidebar }) => {
//   const location = useLocation();

//   return (
//     <div className={`sidebar ${hideSidebar ? "closed" : "open"}`}>
//       {/* Sidebar Header */}
//       <div className="sidebar-header">
//         <h2 className="sidebar-title">
//           {hideSidebar ? "" : "Test Field Force"}
//         </h2>
//         <button
//           className="toggle-btn"
//           onClick={handleCompressSidebar}
//         >
//           {hideSidebar ? ">" : "<"}
//         </button>
//       </div>

//       {/* Sidebar Menu */}
//       <div className="sidebar-menu">
//         {menuData[0].submenu.map((item) => (
//           <Link
//             key={item.id}
//             to={item.link}
//             className={`menu-item ${
//               location.pathname === item.link ? "active" : ""
//             }`}
//           >
//           <img src={item.Icon} alt={item.name} className="menu-icon" />
//             {hideSidebar ? "" : item.name}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { menuData } from "../../../MenuBar/Menu";
import ffcLogo from "../../../assets/images/FFC-logo.png";
const Sidebar = ({ hideSidebar, handleCompressSidebar }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${hideSidebar ? "closed" : "open"}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <img src={ffcLogo} alt="Logo" className="ffc-logo" />
          {hideSidebar ? "" : "Test Field Force"}
        </h2>
        <button className="toggle-btn" onClick={handleCompressSidebar}>
          {hideSidebar ? ">" : "<"}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="sidebar-menu">
        {menuData[0].submenu.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className={`menu-item ${
              location.pathname === item.link ? "active" : ""
            }`}
          >
            <img src={item.Icon} alt={item.name} className="menu-icon" />
            {!hideSidebar && <span>{item.name}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
