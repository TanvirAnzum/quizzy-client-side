import { Navigate, useLocation } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";

export default function PublicRoute({ children }) {
  const isLoggedIn = useCheckAuth();

  const location = useLocation();
  const { from } = location.state || {};

  return !isLoggedIn ? children : <Navigate to={from ? from : "/user"} />;
}
