import { Link, useNavigate } from "react-router";
import { useLocation } from "react-router";
import Button from "./Button";
import { FaUser } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
const AnimatedLine = ({ size }) => {
  return (
    <div
      style={{ width: size }}
      className="animate-line origin-left bg-purple-600  h-1 absolute -bottom-2 left-0"
    ></div>
  );
};

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handelNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="w-full flex justify-evenly items-center mt-2 mb-4   ">
      <Link to={"/"} className="text-purple-800 font-bold cursor-pointer">
        Text to PDF
      </Link>
      <div className="md:flex justify-between text-xl font-[500] text-purple-800 md:w-[50%] w-[30%] hidden">
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
      </div>
      {user && (
        <div className="flex w-[10%] justify-around text-purple-50 rounded-xl bg-purple-500 p-2">
          {user}
          <FaUser />
        </div>
      )}
      {!user && (
        <Button
          onClick={handelNavigate}
          text={"Login"}
          className="btn-custom "
          type="button"
        />
      )}
    </div>
  );
};

export default Header;
