import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
const Close = ({ handelClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, rotate: "180deg" }}
      className="absolute -top-4 -right-4 "
    >
      <IoClose
        onClick={handelClick}
        className=" cursor-pointer p-2 rounded-full
                       transition-all duration-300 hover:bg-purple-600
                       w-12 h-12  text-stone-50 bg-purple-700 shadow-custom-shadow"
      />
    </motion.div>
  );
};

export default Close;
