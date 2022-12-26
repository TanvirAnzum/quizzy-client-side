import { Navigate, useLocation } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useCheckAuth();
  const location = useLocation();
  const { pathname } = location || {};

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: pathname }} />
  );
}
