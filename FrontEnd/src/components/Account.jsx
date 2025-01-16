import { useNavigate } from "react-router-dom";
import Close from "./Close";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
const Account = () => {
  const controls = useAnimationControls();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <main className="w-screen h-screen flex items-center justify-center  ">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0, rotate: "45deg" }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: "45deg" }}
          className="relative w-[75%] h-[75%] rounded-lg bg-stone-50 border-[1px] border-purple-500 shadow-2xl "
        >
          <Close handelClick={handleClick} />
        </motion.div>
      </AnimatePresence>
    </main>
  );
};

export default Account;
