import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <div>loading ...</div>
      ) : user ? (
        <>{children} </>
      ) : (
        <Navigate to={"/"} />
      )}
    </>
  );
};

export default ProtectedRoute;
