import { Link } from "react-router";
import { useLocation } from "react-router";
const AnimatedLine = ({ size }) => {
  return (
    <div
      style={{ width: size }}
      className="line bg-purple-800  h-1 absolute bottom-0 left-0"
    ></div>
  );
};

const Header = () => {
  const { pathname } = useLocation();
  return (
    <div className="flex justify-evenly mt-2 mb-4 ">
      <Link to={"/"} className="text-purple-800 font-bold cursor-pointer">
        Text to PDF
      </Link>
      <div className="md:flex justify-between text-xl font-[500] text-purple-800 w-[30%] hidden">
        <Link className="navBar" to={"/"}>
          Home
          {pathname === "/" && <AnimatedLine size={"55px"} />}
        </Link>
        <Link className="navBar" to={"/about"}>
          About
          {pathname === "/about" && <AnimatedLine size={"57px"} />}
        </Link>
        <Link className="navBar" to={"/contact"}>
          {pathname === "/contact" && <AnimatedLine size={"70px"} />}
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Header;
