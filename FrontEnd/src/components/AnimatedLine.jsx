import { motion } from "framer-motion";
const AnimatedLine = ({ size }) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{
        type: "spring",
        damping: 7,
        stiffness: 120,
        mass: 1,
        restDelta: 0.02,
      }}
      style={{ width: size, originX: 0 }}
      className="bg-purple-100 rounded-xl  h-1 absolute -bottom-2 left-0"
    ></motion.div>
  );
};

export default AnimatedLine;
