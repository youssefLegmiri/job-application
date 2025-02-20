import Loading from "./Loading";
import { AuthContext } from "./AuthProvider";
import { useContext, useEffect } from "react";
import Admin from "./Admin";
import User from "./User";

const Dashboard = () => {
  const { isLogin, user } = useContext(AuthContext);

  return (
    <main className="w-full   flex flex-col items-center mb-12 ">
      {user?.role === "admin" ? <Admin /> : <User />}
      {isLogin && <Loading />}
    </main>
  );
};

export default Dashboard;
