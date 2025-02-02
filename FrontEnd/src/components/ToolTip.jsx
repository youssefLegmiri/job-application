import { motion, AnimatePresence } from "framer-motion";

const ToolTip = ({ text }) => {
  return (
    <motion.div
      initial={{ scale: 0.5, rotate: "-5deg" }}
      animate={{ scale: 1, rotate: 0 }}
      className="absolute top-2 right-14 z-20 bg-purple-500 text-purple-50 px-2 rounded-xl text-lg"
    >
      {text}
    </motion.div>
  );
};

export default ToolTip;
