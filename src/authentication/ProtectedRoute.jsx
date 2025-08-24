import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = useSelector((s) => s.auth.token);
  const location = useLocation();
  if (!token) return <Navigate to="/" replace state={{ from: location }} />;
  return children;
}
