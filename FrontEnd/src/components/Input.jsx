import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Input = ({
  as = "input",
  label,
  type,
  name,
  autofocus,
  error,
  inputData,
  dispatch,
  ref,
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputType, setInputType] = useState(type);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const Component = as === "textarea" ? "textarea" : "input";

  useEffect(() => {
    if (error) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [error]);

  const handelMouseDown = () => {
    setIsVisible(true);
    setInputType("text");
  };
  const handelMouseUp = () => {
    setIsVisible(false);
    setInputType("password");
  };
  const handelChange = (e) => {
    setIsTyping(true);
    if (error) dispatch({ type: "resetErrors" });
    if (e.target.value === "") {
      setIsTyping(false);
    }
  };

  return (
    <div
      className={`w-[80%] relative  border-[1px] rounded-md ${
        isError ? "border-red-600" : "border-purple-600"
      } `}
    >
      <div
        className={`absolute ${isFocus ? "" : "hidden"}  -top-[1px] left-2 ${
          type === "email" ? "w-[60px]" : "w-[100px]"
        }  h-[1px]   bg-purple-100`}
      ></div>
      <label
        className={`pointer-events-none transition-all duration-300 ease-in-out absolute  left-4 ${
          isFocus ? "-top-4 left-[14px] text-lg font-[600] " : "top-2"
        } text-purple-600 font-[400]`}
        htmlFor=""
      >
        {label}
      </label>
      <Component
        ref={ref}
        defaultValue={inputData}
        autoFocus={autofocus}
        onFocus={() => setIsFocus(true)}
        onBlur={(e) => {
          if (e.target.value === "") setIsFocus(false);
        }}
        className="outline-none w-[100%] h-[100%] rounded-md p-4 
                   bg-purple-100 pl-4 text-lg font-semibold text-purple-900  "
        type={inputType}
        name={name}
        onChange={handelChange}
      />
      {name === "password" && !isVisible && isTyping && (
        <FaEyeSlash
          onMouseDown={handelMouseDown}
          size={"30"}
          className="absolute right-4 bottom-3 rounded-lg text-purple-700 cursor-pointer
                     hover:bg-purple-300 p-1"
        />
      )}
      {isVisible && (
        <FaEye
          onMouseUp={handelMouseUp}
          className="absolute right-4 bottom-3 rounded-lg text-purple-700 cursor-pointer
                     hover:bg-purple-300 p-1"
          size={"30"}
        />
      )}
    </div>
  );
};

export default Input;
