import { motion } from "framer-motion";
const Button = ({ isDisabled, icon, size, text, ...rest }) => {
  return (
    <motion.button
      whileHover={isDisabled ? "" : { scale: 1.1, rotate: "1.5deg" }}
      disabled={isDisabled}
      {...rest}
    >
      <img className={`${size}`} src={icon} alt="" />
      {text}
    </motion.button>
  );
};

export default Button;
