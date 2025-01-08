import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { loginContext } from "../App";
const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useContext(loginContext);
  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  return <>{children} </>;
};

export default ProtectedRoute;
