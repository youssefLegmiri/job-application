import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
const BurgerMenu = ({ menuItems, setBurgerClick, lottieRef }) => {
  const { user } = useContext(AuthContext);
  const filterdMenuItems = user?.firstName
    ? menuItems
    : menuItems.filter(
        (item) =>
          item.title != `${user?.role === "admin" ? "Dashboard" : "Jobs"} `
      );
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
  const handleClick = () => {
    setBurgerClick(false);
    lottieRef.current?.playSegments([60, 0], true);
  };
  return (
    <motion.div
      style={{ originX: 0, originY: 0 }}
      variants={variants}
      initial={"hidden"}
      animate={"visible"}
      exit={"hidden"}
      className="absolute left-0 top-24 z-20 flex flex-col justify-around items-center text-xl font-[500]  rounded-lg md:hidden w-[250%] min-h-[200px]  text-purple-700 bg-purple-200 "
    >
      {filterdMenuItems.map((item) => (
        <motion.div className="userMenu" key={item.id} variants={childVariants}>
          <Link onClick={handleClick} to={item.link}>
            {item.title}
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BurgerMenu;
