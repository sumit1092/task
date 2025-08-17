import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Spinner from "../Spinner/Spinner";
import "./SiteLayout.css";

const SiteLayout = () => {
  const [hideSidebar, setHideSidebar] = useState(false);

  const handleCompressSidebar = () => {
    setHideSidebar((prev) => !prev);
  };

  return (
    <div className="home">
      <Sidebar
        hideSidebar={hideSidebar}
        handleCompressSidebar={handleCompressSidebar}
      />
      <div className={`container ${hideSidebar ? "large" : ""}`}>
        <Header setShowSidebar={handleCompressSidebar} />
        <div className="main">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default SiteLayout;
