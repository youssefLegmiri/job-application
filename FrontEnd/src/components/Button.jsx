import { motion } from "framer-motion";
const Button = ({
  isPending,
  icon,
  size,
  text,
  action = "Submitting",
  ...rest
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: "1.5deg" }}
      whileTap={{ rotate: "-1.5deg" }}
      disabled={isPending}
      {...rest}
    >
      <img className={`${size}`} src={icon} alt="" />
      {isPending ? action : text}
    </motion.button>
  );
};

export default Button;
