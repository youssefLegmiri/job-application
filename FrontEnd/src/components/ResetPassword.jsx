import { useRef, useReducer, useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
const ResetPassword = () => {
  const [isCode, setIsCode] = useState(false);
  const { setResponse, isSubmit, setIsSubmit } = useContext(AuthContext);
  const emailInputRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const initialState = {
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    data: {
      email: null,
      password: null,
    },
  };
  const [state, dispatch] = useReducer(errorHandler, initialState);
  const [response, actionFunction, isPending] = useActionState(formAction, {});

  const validateEmail = (formData) => {
    const jsonData = Object.fromEntries(formData.entries());
    const emailData = jsonData.email.split(".");
    if (!jsonData.email) {
      emailInputRef.current?.focus();
      dispatch({
        type: "EMAIL_EMPTY",
      });
    } else if (
      !jsonData.email.includes("@") ||
      !jsonData.email.includes(".") ||
      emailData[0].length < 2 ||
      emailData[1].length < 2
    ) {
      emailInputRef.current?.focus();
      dispatch({
        type: "EMAIL_INVALID_FORMAT",
        payload: { email: jsonData.email },
      });
    } else if (!jsonData.password && isCode) {
      passwordRef.current?.focus();
      dispatch({
        type: "PASSWORD_EMPTY",
        payload: {
          email: jsonData.email,
        },
      });
    } else if (jsonData.password?.length < 8 && isCode) {
      passwordRef.current?.focus();
      dispatch({
        type: "INVALID_PASSWORD_LENGTH",
        payload: {
          email: jsonData.email,
          password: jsonData.password,
        },
      });
    } else {
      dispatch({
        type: "NO_ERROR",
        payload: { email: jsonData.email, password: jsonData.password },
      });
      return actionFunction(formData);
    }
  };
  function errorHandler(state, action) {
    switch (action.type) {
      case "EMAIL_EMPTY":
        return {
          emailError: true,
          emailErrorMessage: "Email is required !",
        };
      case "EMAIL_INVALID_FORMAT":
        return {
          emailError: true,
          emailErrorMessage: "Invalid Email Format !",
          data: {
            email: action.payload.email,
          },
        };
      case "PASSWORD_EMPTY":
        return {
          emailError: false,
          emailErrorMessage: "",
          passwordError: true,
          passwordErrorMessage: "Password required !",
          data: {
            email: action.payload.email,
          },
        };
      case "INVALID_PASSWORD_LENGTH":
        return {
          emailError: false,
          emailErrorMessage: "",
          passwordError: false,
          passwordErrorMessage: "password must be at least 8 characters !",
          data: {
            email: action.payload.email,
            password: action.payload.password,
          },
        };
      case "NO_ERROR":
        return {
          emailError: false,
          passwordError: false,
          passwordErrorMessage: "",
          emailErrorMessage: "",
          data: {
            email: action.payload.email,
            password: action.payload.password,
          },
        };
      case "RESET_ERRORS":
        return {
          ...state,
          emailError: false,
          passwordError: false,
          emailErrorMessage: "",
          passwordErrorMessage: "",
        };
      default:
        return state;
    }
  }
  async function formAction(previousState, formData) {
    const jsonData = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("http://localhost:5000/api/users/ResetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });
      const data = await res.json();
      setIsSubmit(true);
      if (res.status === 200) {
        setIsCode(true);
        setResponse({ message: data.message });
      } else if (res.status === 201) {
        setResponse({ message: data.message });
        navigate("/login");
      } else if (res.status === 400) {
        setResponse({ message: data.message });
      } else {
        setResponse({ message: "Server Error" });
      }
    } catch (error) {
      console.log(error);
      setResponse({ messsage: "Something went wrong.Please try again" });
    }
  }
  const handelClick = () => {
    navigate("/login");
  };
  return (
    <main className="w-screen h-screen  flex justify-center items-center ">
      <form
        className="h-[50%] w-[80%] min-h-[400px] p-2  flex flex-col justify-around items-center
                      border-[1px] border-purple-500 rounded-lg  bg-opacity-75 bg-purple-50 relative
                      xl:w-[30%] lg:w-[50%] md:w-[60%] shadow-2xl "
        action={validateEmail}
      >
        <h1 className="text-purple-600 font-[500] ">Reset Password</h1>
        <div className="relative w-full flex items-center justify-center ">
          <Input
            dispatch={dispatch}
            ref={emailInputRef}
            error={state?.emailError}
            inputData={state?.data?.email}
            autofocus={true}
            name={"email"}
            type={"text"}
            label={"Email"}
          />
          {state?.emailError && (
            <p className="text-red-600 text-sm absolute left-16 -bottom-6">
              {state?.emailErrorMessage}
            </p>
          )}
        </div>
        {isCode && (
          <div className="relative w-full flex items-center justify-center ">
            <Input
              dispatch={dispatch}
              ref={passwordRef}
              error={state?.passwordError}
              inputData={state?.data?.password}
              name={"password"}
              type={"password"}
              label={"New Password"}
            />
            {state?.passwordError && (
              <p className="text-red-600 text-sm absolute left-16 -bottom-6">
                {state?.passwordErrorMessage}
              </p>
            )}
          </div>
        )}
        {isCode && (
          <input
            className="p-2 focus:outline-none text-purple-700 
                       border-[1px] border-purple-700 rounded-lg  "
            placeholder="Code"
            type="text"
            name="resetCode"
          />
        )}
        <Button text={"Submit"} className="btn-custom disabled:bg-purple-500" />
        <div className="absolute -top-4 -right-4 ">
          <IoClose
            onClick={handelClick}
            className=" cursor-pointer p-2 rounded-full
                     transition-all duration-300 hover:bg-purple-600
                     w-12 h-12  text-stone-50 bg-purple-700 shadow-custom-shadow"
          />
        </div>
      </form>
      {(isPending || isSubmit) && <Loading text={"Submitting..."} />}
    </main>
  );
};

export default ResetPassword;
