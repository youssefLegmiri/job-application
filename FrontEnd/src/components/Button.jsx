const Button = ({ type, text, className, fn, isPending }) => {
  return (
    <button
      type={type}
      disabled={isPending}
      style={isPending ? { backgroundColor: "#9766bd" } : {}}
      onClick={fn}
      className={className}
    >
      {text}
    </button>
  );
};

export default Button;
