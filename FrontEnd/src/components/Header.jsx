import { Link, useNavigate, useLocation } from "react-router";
import Button from "./Button";
import Lottie from "react-lottie-player";
import animationData from "../assets/animation/Burger.json";
import { FaUser } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthProvider";
import AnimatedLine from "./AnimatedLine";
import UserMenu from "./UserMenu";
import BurgerMenu from "./BurgerMenu";
import { motion, AnimatePresence } from "framer-motion";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [burgerClick, setBurgerClick] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const menuRef = useRef(null);
  const lottieRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  const handleClick = (event) => {
    if (!menuRef.current?.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handelLogin = () => {
    navigate("/login");
  };
  const handelUser = () => {
    setIsOpen(!isOpen);
  };
  const handleBurgerClick = () => {
    setBurgerClick(!burgerClick);
    if (!burgerClick) {
      lottieRef.current?.playSegments([0, 60], true);
    } else {
      lottieRef.current?.playSegments([60, 0], true);
    }
  };
  return (
    <header className="relative w-full flex justify-evenly items-center my-2   ">
      <Lottie
        speed={1.5}
        ref={lottieRef}
        play={false}
        loop={false}
        onClick={handleBurgerClick}
        className="w-[80px] md:hidden inline-block cursor-pointer "
        animationData={animationData}
      />
      <Link to={"/"} className="text-purple-800 font-bold cursor-pointer">
        Text to PDF
      </Link>
      <nav
        className={`md:flex justify-between text-xl font-[500] text-purple-100 bg-purple-950 px-8 py-4
                      rounded-full ${
                        user?.firstName
                          ? "md:w-[60%] lg:w-[50%]"
                          : "md:w-[50%] lg:w-[40%]"
                      }   hidden`}
      >
        <div className="relative">
          <Link className="navBar " to={"/"}>
            Home
          </Link>
          {pathname === "/" && <AnimatedLine size={"55px"} />}
        </div>
        {user?.firstName && (
          <div className="relative">
            <Link className="navBar" to={"dashboard"}>
              Dashboard
            </Link>
            {pathname === "/dashboard" && <AnimatedLine size={"100px"} />}
          </div>
        )}
        <div className="relative">
          <Link className="navBar" to={"about"}>
            About
          </Link>
          {pathname === "/about" && <AnimatedLine size={"57px"} />}
        </div>
        <div className="relative">
          <Link className="navBar" to={"contact"}>
            Contact
          </Link>
          {pathname === "/contact" && <AnimatedLine size={"70px"} />}
        </div>
      </nav>
      {user?.firstName && (
        <motion.div
          whileTap={{ y: 10, rotate: "2.5deg" }}
          onClick={handelUser}
          ref={menuRef}
          className="relative flex items-center md:w-[18%] lg:w-[15%] xl:w-[10%]  w-[30%] cursor-pointer justify-around font-[500] text-purple-800 border-[1px] border-purple-600 p-2 rounded-lg"
        >
          {user?.firstName}
          {user?.image ? (
            <img src={user?.image} className="w-[60px] " alt="" />
          ) : (
            <FaUser
              size={"40"}
              className="bg-stone-100 text-slate-400 border-[1px] border-stone-400 rounded-full p-2"
            />
          )}

          <AnimatePresence>
            {isOpen && <UserMenu setIsOpen={setIsOpen} />}
          </AnimatePresence>
        </motion.div>
      )}
      {!user?.firstName && (
        <Button
          onClick={handelLogin}
          text={"Login"}
          className="btn-custom "
          type="button"
        />
      )}
      <AnimatePresence>{burgerClick && <BurgerMenu />}</AnimatePresence>
    </header>
  );
};

export default Header;
