import { motion, stagger } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
const BurgerMenu = () => {
  const { user } = useContext(AuthContext);
  const variants = {
    hidden: { scaleY: 0, rotateZ: "-45deg" },
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
  return (
    <motion.div
      style={{ originX: 0, originY: 0 }}
      variants={variants}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      className="absolute left-4 top-20 z-10 flex flex-col justify-around items-center text-xl font-[500]  rounded-lg md:hidden w-[40%] h-[200px]  text-violet-50 bg-purple-600 "
    >
      <motion.div className="userMenu" variants={childVariants}>
        <Link to={"/"}>Home</Link>
      </motion.div>
      {user?.firstName && (
        <motion.div className="userMenu" variants={childVariants}>
          <Link to={"dashboard"}>Dashboard</Link>
        </motion.div>
      )}
      <motion.div className="userMenu" variants={childVariants}>
        <Link to={"about"}>About</Link>
      </motion.div>
      <motion.div className="userMenu" variants={childVariants}>
        <Link to={"contact"}>Contact</Link>
      </motion.div>
    </motion.div>
  );
};

export default BurgerMenu;
