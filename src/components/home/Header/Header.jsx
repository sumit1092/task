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
          {currentMenu} 
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
