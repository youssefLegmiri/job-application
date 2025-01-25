import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
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
        setUser(userData);
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
        isLogin,
        setIsLogin,
        isLogout,
        setIsLogout,
        isRegister,
        setIsRegister,
        isSaving,
        setIsSaving,
        isDelete,
        setIsDelete,

        response,
        setResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
