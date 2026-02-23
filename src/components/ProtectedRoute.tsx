import { useUserStore } from "@/store/user-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Protects routes from unauthenticated access. Redirects to /auth/login if not logged in.
 */
export function ProtectedRoute() {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
