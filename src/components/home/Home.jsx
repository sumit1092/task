import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Spinner from './Spinner/Spinner.jsx';
import ProtectedRoute from '../../authentication/ProtectedRoute.jsx';

const LoginPage = lazy(() => import('../../authentication/LoginPage.jsx'));
const Dashboard = lazy(() => import('./Dashboard/Dashboard.jsx'));
const MyTeam = lazy(() => import('./MyTeam/MyTeam.jsx'));
const MyTask = lazy(() => import('./MyTask/MyTask.jsx'));
const Billing = lazy(() => import('./Billing/Billing.jsx'));
const Settings = lazy(() => import('./Settings/Settings.jsx'));
const SiteLayout = lazy(() => import('./layouts/SiteLayout.jsx'));

const Home = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            element={
              <ProtectedRoute>
                <SiteLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/myteam" element={<MyTeam />} />
            <Route path="/mytask" element={<MyTask />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Home;
