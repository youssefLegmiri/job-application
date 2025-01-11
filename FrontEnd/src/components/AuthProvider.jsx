import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [response, setResponse] = useState({
    error: "",
    message: "",
  });
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/verify", {
          credentials: "include",
          method: "POST",
        });
        const userData = await res.json();
        setUser(userData.firstName);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isLogout,
        setIsLogout,
        isLogin,
        setIsLogin,
        response,
        setResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
