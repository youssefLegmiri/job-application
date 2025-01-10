import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

const UserMenu = ({ setIsOpen }) => {
  const { setUser, setIsLogout, setError } = useContext(AuthContext);

  const handelLogout = async () => {
    setIsOpen(false);
    setIsLogout(true);
    try {
      const res = await fetch("http://localhost:5000/api/users/Logout", {
        method: "POST",
        credentials: "include",
      });
      setIsLogout(false);
      setUser(null);
    } catch (error) {
      setError(
        "Something went wrong please check your connection and try again"
      );
    }
  };
  return (
    <div className="absolute -bottom-28 right-40 text-xl bg-purple-600 text-purple-50 flex flex-col items-center justify-evenly h-[100px] rounded-lg md:w-[18%] lg:w-[15%] xl:w-[10%] w-[30%] ">
      <Link to={"/account"}>Account</Link>
      <p onClick={handelLogout} className="relative cursor-pointer ">
        Logout
        <span className="absolute bottom-1 -right-8">
          <MdLogout />
        </span>
      </p>
    </div>
  );
};

export default UserMenu;
