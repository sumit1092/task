import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { menuData } from "../../../MenuBar/Menu";
import ffcLogo from "../../../assets/images/FFC-logo.png";
const Sidebar = ({ hideSidebar, handleCompressSidebar }) => {
  const location = useLocation();

  return (
    <div className={`sidebar ${hideSidebar ? "closed" : "open"}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">
          <img src={ffcLogo} alt="Logo" className="ffc-logo" />
          {hideSidebar ? "" : "Test Field Force"}
        </h2>
        <button className="toggle-btn" onClick={handleCompressSidebar}>
          {hideSidebar ? ">" : "<"}
        </button>
      </div>

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
