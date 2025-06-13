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
  const { user } = useContext(AuthContext);
  const menuItems = [
    { id: 1, title: "Home", link: "/" },
    {
      id: 2,
      title: `${user?.role === "admin" ? "Dashboard" : "Jobs"} `,
      link: "jobs",
    },
    { id: 3, title: "About", link: "about" },
    { id: 4, title: "Contact", link: "contact" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [burgerClick, setBurgerClick] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const burgerRef = useRef(null);
  const lottieRef = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [burgerClick]);
  const handleClick = (event) => {
    if (!userMenuRef.current?.contains(event.target)) {
      setIsOpen(false);
    }
    if (burgerClick && !burgerRef.current?.contains(event.target)) {
      setBurgerClick(false);
      lottieRef.current?.playSegments([60, 0], true);
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
    <header className=" w-full  bg-opacity-40 bg-purple-200 flex justify-around items-center px-4 py-2  ">
      <div
        ref={burgerRef}
        className="relative w-[20%] md:hidden inline-block   "
      >
        <Lottie
          speed={1.5}
          ref={lottieRef}
          play={false}
          loop={false}
          onClick={handleBurgerClick}
          className="w-[40px] shadow-xl border border-purple-600 rounded-md cursor-pointer "
          animationData={animationData}
        />
        <AnimatePresence>
          {burgerClick && (
            <BurgerMenu
              lottieRef={lottieRef}
              setBurgerClick={setBurgerClick}
              menuItems={menuItems}
            />
          )}
        </AnimatePresence>
      </div>
      <Link
        to={"/"}
        className="text-purple-700  text-center rounded-md p-2 font-bold cursor-pointer "
      >
        Logo
      </Link>
      <nav
        className={`md:flex justify-between text-xl font-[500] text-purple-700  
                       ${
                         user?.firstName
                           ? "md:w-[55%] lg:w-[50%]"
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
            <Link className="navBar" to="jobs">
              {user?.role === "admin" ? "Dashboard" : "Jobs"}
            </Link>

            {(pathname === "/jobs" || pathname === "/jobs/applications") && (
              <AnimatedLine
                size={`${user?.role === "admin" ? "100px" : "50px"}`}
              />
            )}
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
      {user?.firstName ? (
        <motion.div
          onClick={handelUser}
          ref={userMenuRef}
          className="relative bg-purple-200 flex items-center md:w-[22%] lg:w-[20%] xl:w-[20%] 2xl:w-[12%]  w-[40%] cursor-pointer justify-around font-[500] text-purple-700 py-1  rounded-lg"
        >
          {user?.firstName}
          {user?.profileImage ? (
            <img
              src={user?.profileImage}
              className="w-10 h-10 rounded-full text-sm "
              alt="profile"
            />
          ) : (
            <FaUser
              size={"40"}
              className="bg-purple-100 text-purple-700 border-[1px] border-purple-700 rounded-full p-2"
            />
          )}

          <AnimatePresence>
            {isOpen && <UserMenu setIsOpen={setIsOpen} />}
          </AnimatePresence>
        </motion.div>
      ) : (
        <button onClick={handelLogin} className="btn-custom  " type="button">
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
