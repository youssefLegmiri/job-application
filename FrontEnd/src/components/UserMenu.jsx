import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import { motion } from "framer-motion";
const UserMenu = ({ setIsOpen }) => {
  const { setIsLogout, setResponse, setUser } = useContext(AuthContext);

  const handelLogout = async () => {
    setIsOpen(false);
    setIsLogout(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/Logout", {
        method: "POST",
        credentials: "include",
      });

      setResponse({ message: "You have logged out  " });
      setUser(null);
    } catch (error) {
      setResponse({
        error:
          "Something went wrong please check your connection and try again",
      });
    }
  };
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className="absolute z-10 -bottom-28 right-0 text-xl bg-purple-600 text-purple-50 flex flex-col items-center justify-evenly h-[100px] rounded-lg w-[100%] "
    >
      <Link className="userMenu" to={"/account"}>
        Account
      </Link>
      <div onClick={handelLogout} className=" userMenu cursor-pointer ">
        <p className="mr-2"> Logout</p>
        <MdLogout />
      </div>
    </motion.div>
  );
};

export default UserMenu;
