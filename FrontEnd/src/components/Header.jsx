import { Link } from "react-router";
const Header = () => {
  return (
    <div className="p-2 mb-2 flex justify-evenly ">
      <h1>Logo</h1>
      <div className="md:flex justify-between w-[40%] hidden">
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/contact"}>Contact</Link>
      </div>
    </div>
  );
};

export default Header;
