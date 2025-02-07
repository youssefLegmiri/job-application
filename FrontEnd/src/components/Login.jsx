import Input from "./Input";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/google.svg";
import facebook from "../assets/facebook.svg";
import Close from "./Close";
import {
  useActionState,
  useRef,
  useReducer,
  useContext,
  useEffect,
} from "react";
import { AuthContext } from "./AuthProvider";
import { motion } from "framer-motion";
import Loading from "./Loading";

const Login = () => {
  const {
    isRegister,
    isLogin,
    setIsLogin,
    setResponse,
    user,
    setUser,
    isSubmit,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const initialState = {
    emailError: false,
    passwordError: false,
    emailErrorMessage: null,
    passwordErrorMessage: null,
    data: { email: null, password: null },
  };
  const [state, dispatch] = useReducer(errorHandler, initialState);

  const [response, actionFunction, isPending] = useActionState(formAction, {});

  useEffect(() => {
    if (user?.firstName) navigate("/jobs");
  }, [user?.firstName]);

  {
    /*  validating user inputs before triggering the form action */
  }
  const validateInput = (formData) => {
    const jsonData = Object.fromEntries(formData.entries());
    const emailData = jsonData.email.split(".");
    if (!jsonData.email) {
      emailInputRef.current.focus();
      dispatch({
        type: "emailError",
        payload: { password: jsonData.password },
      });
    } else if (
      !jsonData.email.includes("@") ||
      !jsonData.email.includes(".") ||
      emailData[0].length < 2 ||
      emailData[1].length < 2
    ) {
      emailInputRef.current.focus();
      dispatch({
        type: "EMAIL_INVALID_FORMAT",
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
      case "EMAIL_INVALID_FORMAT":
        return {
          emailError: true,
          emailErrorMessage: "Invalid Email Format ! ",
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

  {
    /* form action (api call) */
  }
  async function formAction(previous, formData) {
    const jsonData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:5000/api/users/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(jsonData),
      });
      const userData = await res.json();

      setResponse({ error: "", message: "" });
      setIsLogin(true);

      if (res.status === 200) {
        setUser(userData);

        setResponse({ message: `Welcome ${userData.firstName}` });
      } else if (res.status === 400) {
        setResponse({ error: "Invalid Credentials !" });
      } else {
        setResponse({ error: "Server Error" });
      }
    } catch (error) {
      setIsLogin(true);
      setResponse({ error: "Something went wrong please try again." });
    }
  }

  const handelClick = () => {
    navigate("/");
  };

  return (
    <main className="w-screen h-screen overflow-hidden flex justify-center items-center ">
      <motion.form
        initial={{ scale: 0, rotate: "-45deg" }}
        animate={{ scale: 1, rotate: 0 }}
        style={{ originX: "0", originY: "100%" }}
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
          <Link to={"/ResetPassword"}>
            <p className="text-lg font-[500] text-purple-600 hover:text-purple-500">
              Forgot password ?
            </p>
          </Link>
        </div>
        {/*Login button */}

        <Button
          isDisabled={isPending}
          type={"submit"}
          text={"Login"}
          className={"btn-custom disabled:bg-purple-500"}
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
        <Close handelClick={handelClick} />
      </motion.form>
      {isRegister && <Loading />}
      {(isLogin || isPending) && <Loading text={"Logging ..."} />}
      {isSubmit && <Loading />}
    </main>
  );
};

export default Login;
