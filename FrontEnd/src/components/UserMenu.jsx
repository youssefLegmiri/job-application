import { MdLogout } from "react-icons/md";
import { data, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
import { motion } from "framer-motion";
const UserMenu = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const { setIsLogout, setResponse, user, setUser, serverDomain } =
    useContext(AuthContext);
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
      const res = await fetch(`${serverDomain}/api/users/Logout`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      navigate("/login");
      if (res.status === 200) {
        setResponse({ message: data.message });
        setUser(null);
      } else {
        setResponse({
          message: data.message,
        });
      }
    } catch (error) {
      setResponse({
        error: data.message,
      });
    }
  };
  const handleClick = () => {
    navigate("/account");
  };
  return (
    <motion.div
      style={{ originX: 0, originY: 0 }}
      variants={variants}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      className="absolute z-50 top-24 right-0 text-xl bg-purple-200 text-purple-700 flex flex-col items-center justify-evenly h-[200px] rounded-lg w-[150%] "
    >
      <motion.div
        variants={childVariants}
        className=" userMenu cursor-pointer "
      >
        {user?.role === "admin" ? (
          <Link to={"jobs/applications"}>Applications</Link>
        ) : (
          <Link to={"jobs/myApplication"}>my Application</Link>
        )}
      </motion.div>
      <motion.div
        onClick={handleClick}
        className="userMenu"
        variants={childVariants}
      >
        Account
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
