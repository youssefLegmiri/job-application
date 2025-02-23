import Loading from "./Loading";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const Home = () => {
  const { isDelete } = useContext(AuthContext);
  return (
    <main
      className="w-full h-full p-2 flex flex-col justify-between items-center
    "
    >
      {isDelete && <Loading />}
    </main>
  );
};

export default Home;
