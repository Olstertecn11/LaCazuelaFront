import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '@/utils/session';

const ProtectedRoute = ({ children }: { children: Element.JSX }) => {
  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
