import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "./AuthProvider";

const Loading = ({ message }) => {
  const { Error, setIsLogout, setError } = useContext(AuthContext);
  const handelClick = () => {
    setIsLogout(false);
    setError("");
  };
  return (
    <div className=" w-screen h-screen absolute flex justify-center items-center bg-zinc-700 bg-opacity-50  ">
      <div
        className="relative w-[80%] xl:w-[30%] lg:w-[50%] md:w-[60%] h-[20%]
                    bg-purple-50 rounded-xl flex flex-col items-center justify-evenly
                      "
      >
        {!Error && (
          <p className="text-stone-900 text-2xl font-[500] ">{message} </p>
        )}
        {Error && <p className="text-red-600 text-lg text-center ">{Error} </p>}
        {Error && (
          <div className="absolute -top-4 -right-4 ">
            <IoClose
              onClick={handelClick}
              className=" cursor-pointer p-2 rounded-full
                            transition-all duration-300 hover:bg-purple-600
                            w-12 h-12  text-stone-50 bg-purple-700 shadow-custom-shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
