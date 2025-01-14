import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import LoaderSpinner from "./LoaderSpinner";
import Close from "./Close";
import { motion } from "framer-motion";
const Loading = ({ text }) => {
  const { response, setIsLogin, setIsLogout, setIsRegister, setResponse } =
    useContext(AuthContext);
  const handelClick = () => {
    {
      setIsLogout(false);
      setIsLogin(false);
      setIsRegister(false);
      setResponse({
        message: "",
        error: "",
      });
    }
  };
  return (
    <div className="fixed -inset-0 flex justify-center items-center bg-zinc-700 bg-opacity-50  ">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="relative w-[80%] xl:w-[30%] lg:w-[50%] md:w-[60%] h-[20%]
                    bg-purple-100 shadow-custom-shadow rounded-xl flex flex-col items-center justify-evenly
                      "
      >
        {response.error ? (
          ""
        ) : response.message ? (
          ""
        ) : (
          <div className=" flex flex-col items-center">
            <LoaderSpinner />
            <p className="text-purple-600 text-2xl font-[500] ">{text} </p>
          </div>
        )}
        {response.error && (
          <p className="text-red-600 text-2xl font-[500] text-center ">
            {response.error}
          </p>
        )}
        {response.message && (
          <p className="text-purple-600 text-2xl font-[500] text-center ">
            {response.message}
          </p>
        )}
        {(response.error || response.message) && (
          <Close handelClick={handelClick} />
        )}
      </motion.div>
    </div>
  );
};

export default Loading;
