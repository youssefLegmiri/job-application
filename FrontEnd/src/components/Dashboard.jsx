import Loading from "./Loading";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import Admin from "./Admin";
import User from "./User";
const Dashboard = () => {
  const { isLogin, user } = useContext(AuthContext);
  return (
    <>
      {user?.role === "admin" ? <Admin /> : <User />}
      {isLogin && <Loading />}
    </>
  );
};

export default Dashboard;
