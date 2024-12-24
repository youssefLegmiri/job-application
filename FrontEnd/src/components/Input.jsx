import { useEffect, useState } from "react";

const Input = ({ as = "input", label, type, name, autofocus }) => {
  const [isFocus, setIsFocus] = useState(false);

  const Component = as === "textarea" ? "textarea" : "input";

  return (
    <div
      className={`w-[80%] relative  border-[1px] rounded-md ${
        isFocus ? "border-purple-600" : "border-purple-800"
      } `}
    >
      <div
        className={`absolute ${isFocus ? "" : "hidden"}  -top-[1px] left-0 ${
          type === "email" ? "w-[60px]" : "w-[100px]"
        }  h-[1px] translate-x-2 rounded-md bg-purple-50`}
      ></div>
      <label
        className={`pointer-events-none transition-all duration-300 ease-in-out absolute  left-4 ${
          isFocus ? "-top-4 left-[14px] text-lg font-[600] " : "top-2"
        } text-purple-800 font-[400]`}
        htmlFor=""
      >
        {label}
      </label>
      <Component
        autoFocus={autofocus}
        onFocus={() => setIsFocus(true)}
        onBlur={(e) => {
          if (e.target.value === "") setIsFocus(false);
        }}
        className="outline-none w-[100%] rounded-md p-4 
                   bg-purple-50 pl-4 text-lg  "
        type={type}
        name={name}
        required
      />
    </div>
  );
};

export default Input;
