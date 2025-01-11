import Form from "./Form";
import Loading from "./Loading";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
const Dashboard = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <main className="w-full p-2 flex flex-col justify-center items-center">
      <Form />
      {isLogin && <Loading />}
    </main>
  );
};

export default Dashboard;
