import { Link, useNavigate } from "react-router";
import { useLocation } from "react-router";
import Button from "./Button";
const AnimatedLine = ({ size }) => {
  return (
    <div
      style={{ width: size }}
      className="animate-line origin-left bg-purple-600  h-1 absolute bottom-1 left-0"
    ></div>
  );
};

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handelNavigate = () => {
    navigate("/login");
  };
  return (
    <div className="w-full flex justify-evenly mt-2 mb-4 ">
      <Link to={"/"} className="text-purple-800 font-bold cursor-pointer">
        Text to PDF
      </Link>
      <div className="md:flex justify-between text-xl font-[500] text-purple-800 w-[30%] hidden">
        <Link className="navBar" to={"/"}>
          Home
          {pathname === "/" && <AnimatedLine size={"55px"} />}
        </Link>
        <Link className="navBar" to={"about"}>
          About
          {pathname === "about" && <AnimatedLine size={"57px"} />}
        </Link>
        <Link className="navBar" to={"contact"}>
          {pathname === "contact" && <AnimatedLine size={"70px"} />}
          Contact
        </Link>
      </div>
      {pathname != "login" && (
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
