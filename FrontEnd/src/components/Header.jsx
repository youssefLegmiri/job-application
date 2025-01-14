import { Link, useNavigate, useLocation } from "react-router";
import Button from "./Button";
import { FaUser } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import AnimatedLine from "./AnimatedLine";
import UserMenu from "./UserMenu";
import { motion, AnimatePresence } from "framer-motion";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handelLogin = () => {
    navigate("/login");
  };
  const handelUser = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className=" w-full flex justify-evenly items-center mt-2 mb-4   ">
      <Link to={"/"} className="text-purple-800 font-bold cursor-pointer">
        Text to PDF
      </Link>
      <nav className="md:flex justify-between text-xl font-[500] text-purple-800 md:w-[50%] w-[30%] hidden">
        <div className="relative">
          <Link className="navBar " to={"/"}>
            Home
          </Link>
          {pathname === "/" && <AnimatedLine size={"55px"} />}
        </div>
        {user && (
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
      {user && (
        <motion.div
          whileTap={{ y: 10, rotate: "2.5deg" }}
          onClick={handelUser}
          className="relative flex md:w-[18%] lg:w-[15%] xl:w-[10%]  w-[30%] cursor-pointer justify-around text-purple-50 bg-purple-600 p-2 rounded-lg"
        >
          {user}
          <FaUser />
          <AnimatePresence>
            {isOpen && <UserMenu setIsOpen={setIsOpen} />}
          </AnimatePresence>
        </motion.div>
      )}
      {!user && (
        <Button
          onClick={handelLogin}
          text={"Login"}
          className="btn-custom "
          type="button"
        />
      )}
    </header>
  );
};

export default Header;
