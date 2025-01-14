import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
const ProtectedRoute = ({ children }) => {
  const { loading, user } = useContext(AuthContext);

  return (
    <>
      {loading ? <Loading /> : user ? <>{children} </> : <Navigate to={"/"} />}
    </>
  );
};

export default ProtectedRoute;
