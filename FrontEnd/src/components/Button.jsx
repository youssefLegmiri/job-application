const Button = ({
  isPending,
  icon,
  size,
  text,
  action = "Submitting",
  ...rest
}) => {
  return (
    <button disabled={isPending} {...rest}>
      <img className={`${size}`} src={icon} alt="" />
      {isPending ? action : text}
    </button>
  );
};

export default Button;
