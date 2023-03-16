import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { userData } = useAuthContext();
  if (!userData || (requireAdmin && !userData.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
