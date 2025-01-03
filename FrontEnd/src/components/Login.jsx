import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";
import google from "../assets/google.svg";
import facebook from "../assets/facebook.svg";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useActionState, useRef, useReducer } from "react";

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  console.log("Login");
  const initialState = {
    emailError: false,
    passwordError: false,
    emailErrorMessage: null,
    passwordErrorMessage: null,
    data: { email: null, password: null },
  };
  const [state, dispatch] = useReducer(errorHandler, initialState);

  const [data, actionFunction, isPending] = useActionState(formAction, {});

  {
    /*  validating user inputs before triggering the form action */
  }
  const validateInput = (formData) => {
    const jsonData = Object.fromEntries(formData.entries());
    if (!jsonData.email) {
      emailInputRef.current.focus();
      dispatch({
        type: "emailError",
        payload: { password: jsonData.password },
      });
    } else if (!jsonData.email.includes("@") || !jsonData.email.includes(".")) {
      emailInputRef.current.focus();
      dispatch({
        type: "missing@",
        payload: { email: jsonData.email, password: jsonData.password },
      });
    } else if (!jsonData.password) {
      passwordInputRef.current.focus();
      dispatch({
        type: "passwordError",
        payload: { email: jsonData.email },
      });
    } else if (jsonData.password?.length < 8) {
      passwordInputRef.current.focus();
      dispatch({
        type: "passwordLength",
        payload: {
          email: jsonData.email,
          password: jsonData.password,
        },
      });
    } else {
      dispatch({
        type: "noError",
        payload: {
          email: jsonData.email,
          password: jsonData.password,
        },
      });
      return actionFunction(formData);
    }
  };
  {
    /* updating error states and returing inputs data */
  }
  function errorHandler(state, action) {
    switch (action.type) {
      case "emailError":
        return {
          emailError: true,
          emailErrorMessage: "Email is required",
          passwordError: false,
          passwordErrorMessage: "",
          data: { email: null, password: action.payload.password },
        };
      case "missing@":
        return {
          emailError: true,
          emailErrorMessage: "Email must include @ and . symbol  ",
          passwordError: false,
          passwordErrorMessage: "",
          data: {
            email: action.payload.email,
            password: action.payload.password,
          },
        };
      case "passwordError":
        return {
          emailError: false,
          emailErrorMessage: "",
          passwordError: true,
          passwordErrorMessage: "password is required",
          data: { email: action.payload.email },
        };
      case "passwordLength":
        return {
          emailError: false,
          emailErrorMessage: "",
          passwordError: true,
          passwordErrorMessage: "password must be at least 8 characters !",
          data: {
            email: action.payload.email,
            password: action.payload.password,
          },
        };
      case "noError":
        return {
          data: {
            email: action.payload.email,
            password: action.payload.password,
          },
        };
      case "resetErrors":
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

  {
    /* form action (api call) */
  }
  async function formAction(previous, formData) {
    const jsonData = Object.fromEntries(formData.entries());
    console.log("hey !");
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  const handelClick = () => {
    navigate("/");
  };
  return (
    <main className="w-screen h-screen  flex justify-center items-center ">
      <form
        action={validateInput}
        className="h-[50%] w-[80%] min-h-[700px] p-2  flex flex-col justify-around items-center
                      border-[1px] border-purple-500 rounded-lg  bg-purple-50 relative
                      xl:w-[30%] lg:w-[50%] md:w-[60%] shadow-2xl "
      >
        <h1 className="text-2xl text-purple-700 font-bold">Login</h1>
        {/* Email input  */}
        <div className="relative w-full flex items-center justify-center ">
          <Input
            ref={emailInputRef}
            dispatch={dispatch}
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
        {/* password input  */}
        <div className="relative w-full flex items-center justify-center ">
          <Input
            ref={passwordInputRef}
            dispatch={dispatch}
            inputData={state?.data?.password}
            error={state?.passwordError}
            name={"password"}
            type={"password"}
            label={"Password"}
          />
          {state?.passwordError && !isPending && (
            <p className="text-red-600 text-sm absolute left-16 -bottom-6">
              {state?.passwordErrorMessage}
            </p>
          )}
        </div>
        {/*Forgot password ? */}
        <div className="flex md:w-[50%] w-[80%] justify-around ">
          <Link to={"/"}>
            <p className="text-lg font-[500] text-purple-600 hover:text-purple-500">
              Forgot password ?
            </p>
          </Link>
        </div>
        {/*Login button */}
        <Button
          action={"Logging..."}
          isPending={isPending}
          type={"submit"}
          text={"Login"}
          className={"btn-custom disabled:bg-purple-400"}
        />
        {/*Don't have an account ? Sign up */}
        <div className="md:w-[60%] w-[80%] xl:w-[90%] text-purple-600 text-lg flex justify-evenly items-center">
          <p className=" ">Don't have an account ?</p>
          <Link
            className="text-purple-800 hover:text-purple-600"
            to={"/register"}
          >
            Sign up
          </Link>
        </div>
        {/* horizental line   */}
        <div className="w-[80%]  flex items-center justify-between">
          <div className=" w-[40%] h-[1px] bg-gray-400 "></div>
          <span className="text-gray-400">Or</span>
          <div className="w-[40%] h-[1px] bg-gray-400"></div>
        </div>
        {/*Social media buttons */}
        <div className="flex flex-col w-[70%]  h-[20%] items-center justify-evenly">
          <Button
            type={"button"}
            icon={google}
            size={"w-6"}
            text={"Login with google"}
            className="btn-custom shadow-none flex justify-evenly items-center text-slate-500 bg-slate-50 hover:bg-slate-100
                       font-[500]  border-[1px] border-slate-400 w-full "
          />
          <Button
            type={"button"}
            icon={facebook}
            size={"w-8"}
            text={"Login with facebook"}
            className="btn-custom shadow-none flex justify-evenly items-center text-slate-500 bg-slate-50 hover:bg-slate-100
                       font-[500]  border-[1px] border-slate-400 w-full"
          />
        </div>
        <div className="absolute -top-4 -right-4 ">
          <IoClose
            onClick={handelClick}
            className=" cursor-pointer p-2 rounded-full
                             transition-all duration-300 hover:bg-purple-600
                             w-12 h-12  text-stone-50 bg-purple-700 shadow-custom-shadow"
          />
        </div>
      </form>
    </main>
  );
};

export default Login;
