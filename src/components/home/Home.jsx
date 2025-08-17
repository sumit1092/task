// // import LoginPage from "../../authentication/LoginPage";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Dashboard from "./Dashboard";
// // import MyTeam from "./MyTeam";
// // import MyTask from "./MyTask";
// // import Billing from "./Billing";
// // import Settings from "./Settings";
// // import Sidebar from "./Sidebar";

// // const Home = () => {
// //   return (
// //     <BrowserRouter>
// //       <div style={{ display: "flex" }}>
// //         <Sidebar />
// //         <div style={{ flex: 1, padding: "20px" }}>
// //           <Routes>
// //             <Route path="/" element={<LoginPage />} />
// //             <Route path="/dashboard" element={<Dashboard />} />
// //             <Route path="/myteam" element={<MyTeam />} />
// //             <Route path="/mytask" element={<MyTask />} />
// //             <Route path="/billing" element={<Billing />} />
// //             <Route path="/settings" element={<Settings />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </BrowserRouter>
// //   );
// // };

// // export default Home;
// import React, { Suspense } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import LoginPage from "../../authentication/LoginPage";
// import Dashboard from "./Dashboard";
// import MyTeam from "./MyTeam";
// import MyTask from "./MyTask";
// import Billing from "./Billing";
// import Settings from "./Settings";

// // layout
// import SiteLayout from "./layouts/SiteLayout"
// import Spinner from "../home/Spinner/Spinner"

// const Home = () => {
//   return (
//     <BrowserRouter>
//       <Suspense fallback={<Spinner />}>
//         <Routes>
//           {/* Public Route */}
//           <Route path="/" element={<LoginPage />} />

//           {/* Private Routes inside layout */}
//           <Route element={<SiteLayout />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/myteam" element={<MyTeam />} />
//             <Route path="/mytask" element={<MyTask />} />
//             <Route path="/billing" element={<Billing />} />
//             <Route path="/settings" element={<Settings />} />
//           </Route>

//           {/* Redirect unknown routes */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );
// };

// export default Home;
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../../authentication/LoginPage";
import Dashboard from "../home/Dashboard/Dashboard";
import MyTeam from "../home/MyTeam/MyTeam";
import MyTask from "../home/MyTask/MyTask";
import Billing from "../home/Billing/Billing";
import Settings from "../home/Settings/Settings";

// layout
import SiteLayout from "./layouts/SiteLayout";
import Spinner from "../home/Spinner/Spinner";
import ProtectedRoute from "../../authentication/ProtectedRoute"; // import here

const Home = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<LoginPage />} />

          {/* Private Routes */}
          <Route
            element={
             // <ProtectedRoute>
                <SiteLayout />
              //</ProtectedRoute> 
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myteam" element={<MyTeam />} />
            <Route path="/mytask" element={<MyTask />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Home;


