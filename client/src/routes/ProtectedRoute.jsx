import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const location = useLocation();
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      toast.error("You must be signed in to access this page.");
      hasShownToast.current = true;
    } else if (
      allowedRoles &&
      !allowedRoles.includes(role) &&
      !hasShownToast.current
    ) {
      toast.error("You do not have permission to access this page.");
      hasShownToast.current = true;
    }
    return () => {
      hasShownToast.current = false;
    };
  }, [isAuthenticated, role, allowedRoles, location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
