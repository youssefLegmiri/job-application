import { useFormStatus } from "react-dom";
const Button = ({ type, text, className, fn, action = "Submitting" }) => {
  const { pending } = useFormStatus();

  return (
    <div className="relative">
      <button type={type} disabled={pending} onClick={fn} className={className}>
        {pending ? action : text}
      </button>
      {pending && (
        <div
          className="absolute top-3 left-3 h-5 w-5 border-2 border-purple-200 rounded-full
                    border-t-transparent animate-spin "
        ></div>
      )}
    </div>
  );
};

export default Button;
