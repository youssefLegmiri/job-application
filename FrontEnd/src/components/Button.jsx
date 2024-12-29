const Button = ({ type, text, className, fn, isPending }) => {
  return (
    <button type={type} disabled={isPending} onClick={fn} className={className}>
      {text}
    </button>
  );
};

export default Button;
