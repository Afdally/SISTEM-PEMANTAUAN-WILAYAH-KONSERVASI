import { Navigate, Outlet, useLocation } from "react-router";

export const adminSessionKey = "simeka-admin-design-session";

export default function AdminGuard() {
  const location = useLocation();
  const signedIn = sessionStorage.getItem(adminSessionKey) === "active";

  return signedIn ? <Outlet /> : <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
}

