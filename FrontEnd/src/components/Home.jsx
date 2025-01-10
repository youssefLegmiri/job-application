import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <main className="w-full p-2 flex flex-col justify-between items-center">
      home
    </main>
  );
};

export default Home;
