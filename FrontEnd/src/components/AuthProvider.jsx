import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDeleteJob, setIsDeleteJob] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isApply, setIsApply] = useState(false);
  const [isSavingJob, setIsSavingJob] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [userEmail, setUserEmail] = useState("");
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
        if (res.status === 200) {
          setUser(userData);
        } else if (res.status === 401) {
          setUser(null);
        }
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
        isError,
        setIsError,
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
        isSubmit,
        setIsSubmit,
        isDeleteJob,
        setIsDeleteJob,
        isUpdate,
        setIsUpdate,
        isApply,
        setIsApply,
        isSavingJob,
        setIsSavingJob,
        isLoading,
        setIsLoading,
        jobs,
        setJobs,
        response,
        setResponse,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
