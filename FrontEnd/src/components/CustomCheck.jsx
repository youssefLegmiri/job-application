import { motion } from "framer-motion";
import { useEffect } from "react";
const CustomCheck = ({ isEdit, setIsEdit, ref }) => {
  useEffect(() => {
    ref.current.focus();
  }, [isEdit]);
  const handleClick = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className="absolute top-4 left-4 w-24 cursor-pointer">
      <div
        onClick={handleClick}
        className={`w-16 h-7 flex items-center  rounded-2xl border-[1px] border-purple-400 ${
          !isEdit ? "bg-purple-400" : "bg-stone-200   "
        }  `}
      >
        <motion.div
          initial={{ x: "-5px" }}
          animate={!isEdit ? { x: "40px" } : { x: "-5px" }}
          className="w-7 h-7 rounded-full bg-purple-200 border-4 border-purple-600 "
        ></motion.div>
      </div>
      <h1 className="text-lg mt-2 text-purple-800">Edit profile</h1>
    </div>
  );
};

export default CustomCheck;
