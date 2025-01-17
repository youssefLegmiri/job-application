import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import { motion } from "framer-motion";
const UserMenu = ({ setIsOpen }) => {
  const { setIsLogout, setResponse, setUser } = useContext(AuthContext);
  const variants = {
    hidden: {
      scaleY: 0,
      rotateZ: "-45deg",
    },
    visible: {
      scaleY: 1,
      rotateZ: 0,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };
  const childVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1 },
  };
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
      style={{ originX: 0, originY: 0 }}
      variants={variants}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      className="absolute z-10 -bottom-28 right-0 text-xl bg-purple-600 text-purple-50 flex flex-col items-center justify-evenly h-[100px] rounded-lg w-[100%] "
    >
      <motion.div className="userMenu" variants={childVariants}>
        <Link to={"/account"}>Account</Link>
      </motion.div>
      <motion.div
        variants={childVariants}
        onClick={handelLogout}
        className=" userMenu cursor-pointer "
      >
        <p className="mr-2"> Logout</p>
        <MdLogout />
      </motion.div>
    </motion.div>
  );
};

export default UserMenu;
