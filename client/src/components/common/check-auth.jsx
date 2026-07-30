import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes('/auth/login') ||
      location.pathname.includes('/auth/register') ||
      location.pathname.includes('/shop')
    )) {
    return <Navigate to='/auth/login' />;
  }

  if (isAuthenticated && (location.pathname.startsWith('/auth/login') || location.pathname.startsWith('/auth/register'))) {
    return (user?.role === "admin")
      ? <Navigate to="/admin/dashboard" />
      : <Navigate to="/shop/home" />
  }

  if (isAuthenticated && user?.role !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/unauth" />;
  }

  if (isAuthenticated && user?.role === 'admin' && location.pathname.startsWith("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>
}

export default CheckAuth;