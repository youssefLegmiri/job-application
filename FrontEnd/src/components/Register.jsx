import Input from "./Input";
import Button from "./Button";
import { useReducer, useRef, useContext } from "react";
import { useActionState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
const Register = () => {
  const { setIsRegister, isRegister, setResponse } = useContext(AuthContext);
  const navigate = useNavigate();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const initialState = {
    firstNameError: false,
    lastNameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    firstNameErrorMessage: "",
    lastNameErrorMessage: "",
    emailErrorMessage: "",
    passwordErrorMessage: "",
    confirmPasswordErrorMessage: "",
    data: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
    },
  };
  const [state, dispatch] = useReducer(errorHandler, initialState);
  const [response, actionFunction, isPending] = useActionState(formAction, {
    error: null,
  });

  {
    /* validating user inputs */
  }
  const validateInput = (formData) => {
    const jsonData = Object.fromEntries(formData.entries());
    const emailData = jsonData.email.split(".");
    if (!jsonData.firstName) {
      firstNameRef.current.focus();
      dispatch({
        type: "FIRST_NAME_EMPTY",
        payload: {
          lastName: jsonData.lastName,
          email: jsonData.email,
          password: jsonData.password,
          confirmPassword: jsonData.confirmPassword,
        },
      });
    } else if (!jsonData.lastName) {
      lastNameRef.current.focus();
      dispatch({
        type: "LAST_NAME_EMPTY",
        payload: {
          firstName: jsonData.firstName,
          email: jsonData.email,
          password: jsonData.password,
          confirmPassword: jsonData.confirmPassword,
        },
      });
    } else if (!jsonData.email) {
      emailRef.current.focus();
      dispatch({
        type: "EMAIL_EMPTY",
        payload: {
          firstName: jsonData.firstName,
          lastName: jsonData.lastName,
          password: jsonData.password,
          confirmPassword: jsonData.confirmPassword,
        },
      });
    } else if (
      !jsonData.email.includes("@") ||
      !jsonData.email.includes(".") ||
      emailData[0].length < 2 ||
      emailData[1].length < 2
    ) {
      emailRef.current.focus();
      dispatch({
        type: "EMAIL_INVALID_FORMAT",
        payload: {
          firstName: jsonData.firstName,
          lastName: jsonData.lastName,
          email: jsonData.email,
          password: jsonData.password,
          confirmPassword: jsonData.confirmPassword,
        },
      });
    } else if (!jsonData.password) {
      passwordRef.current.focus();
      dispatch({
        type: "PASSWORD_EMPTY",
        payload: {
          firstName: jsonData.firstName,
          lastName: jsonData.lastName,
          email: jsonData.email,
          confirmPassword: jsonData.confirmPassword,
        },
      });
    } else if (jsonData.password.length < 8) {
      passwordRef.current.focus();
      dispatch({
        type: "INVALID_PASSWORD_LENGTH",
        payload: {
          firstName: jsonData.firstName,
          lastName: jsonData.lastName,
          email: jsonData.email,
          password: jsonData.password,
          confirmPassword: jsonData.confirmPassword,
        },
      });
    } else if (jsonData.password != jsonData.confirmPassword) {
      confirmPasswordRef.current.focus();
      dispatch({
        type: "PASSWORD_MISMATCH",
        payload: {
          firstName: jsonData.firstName,
          lastName: jsonData.lastName,
          email: jsonData.email,
          password: jsonData.password,
          confirmPassword: jsonData.confirmPassword,
        },
      });
    } else {
      dispatch({
        type: "NO_ERROR",
        payload: {
          firstName: jsonData.firstName,
          lastName: jsonData.lastName,
          email: jsonData.email,
          password: jsonData.password,
          confirmPassword: jsonData.confirmPassword,
        },
      });
      return actionFunction(formData);
    }
  };
  {
    /*  updating states and returing inputs data */
  }
  function errorHandler(state, action) {
    switch (action.type) {
      case "FIRST_NAME_EMPTY":
        return {
          firstNameError: true,
          firstNameErrorMessage: "First Name is required !",
          data: {
            lastName: action.payload.lastName,
            email: action.payload.email,
            password: action.payload.password,
            confirmPassword: action.payload.confirmPassword,
          },
        };
      case "LAST_NAME_EMPTY":
        return {
          lastNameError: true,
          lastNameErrorMessage: "Last Name is required !",
          data: {
            firstName: action.payload.firstName,
            email: action.payload.email,
            password: action.payload.password,
            confirmPassword: action.payload.confirmPassword,
          },
        };
      case "EMAIL_EMPTY":
        return {
          emailError: true,
          emailErrorMessage: "Email is required !",
          data: {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            password: action.payload.password,
            confirmPassword: action.payload.confirmPassword,
          },
        };
      case "EMAIL_INVALID_FORMAT":
        return {
          emailError: true,
          emailErrorMessage: "Invalid email format !",
          data: {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            password: action.payload.password,
            email: action.payload.email,
            confirmPassword: action.payload.confirmPassword,
          },
        };
      case "PASSWORD_EMPTY":
        return {
          passwordError: true,
          passwordErrorMessage: "password is required !",
          data: {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            confirmPassword: action.payload.confirmPassword,
          },
        };
      case "INVALID_PASSWORD_LENGTH":
        return {
          passwordError: true,
          passwordErrorMessage: "password must be at least 8 characters !",
          data: {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            password: action.payload.password,
            confirmPassword: action.payload.confirmPassword,
          },
        };
      case "PASSWORD_MISMATCH":
        return {
          confirmPasswordError: true,
          confirmPasswordErrorMessage: " Passwords do not match !",
          data: {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            password: action.payload.password,
            confirmPassword: action.payload.confirmPassword,
          },
        };
      case "NO_ERROR":
        return {
          data: {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            password: action.payload.password,
            confirmPassword: action.payload.confirmPassword,
          },
        };
      case "RESET_ERRORS":
        return {
          ...state,
          firstNameError: false,
          lastNameError: false,
          emailError: false,
          passwordError: false,
          confirmPasswordError: false,
          firstNameErrorMessage: "",
          lastNameErrorMessage: "",
          emailErrorMessage: "",
          passwordErrorMessage: "",
          confirmPasswordErrorMessage: "",
        };
      default:
        return state;
    }
  }
  async function formAction(previousState, formData) {
    const jsonData = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("http://localhost:5000/api/users/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });
      const response = await res.json();
      setIsRegister(true);
      if (res.status === 201) {
        navigate("/login");
        setResponse({ message: "Your account has been created successfully." });
      } else if (res.status === 409) {
        setResponse({ error: "Email already in use !" });
      } else if (res.status === 400) {
        setResponse({ error: "Please enter all fields." });
      } else {
        setResponse({ error: "Server not responding" });
      }
    } catch (error) {
      setIsRegister(true);
      setResponse({ error: "Something went wrong please try again." });
    }
  }

  const handelClick = () => {
    navigate("/login");
  };
  return (
    <main className="w-screen h-screen bg-purple-200 flex justify-center items-center">
      <form
        className="h-[80%] w-[80%] relative min-h-[600px] p-2  flex flex-col justify-evenly items-center
                      border-[1px] border-purple-500 rounded-lg  bg-purple-50 shadow-xl
                      xl:w-[30%] lg:w-[50%] md:w-[60%]"
        action={validateInput}
      >
        <h1 className="text-purple-600 font-bold">Sign Up</h1>
        <div className="relative w-full flex items-center justify-center ">
          <Input
            ref={firstNameRef}
            dispatch={dispatch}
            error={state?.firstNameError}
            inputData={state?.data?.firstName}
            label={"First Name"}
            type={"text"}
            name={"firstName"}
            autofocus={true}
          />
          {state?.firstNameError && (
            <p className="text-red-600 text-sm absolute left-16 -bottom-6">
              {state?.firstNameErrorMessage}
            </p>
          )}
        </div>
        <div className="relative w-full flex items-center justify-center ">
          <Input
            ref={lastNameRef}
            dispatch={dispatch}
            error={state?.lastNameError}
            inputData={state?.data?.lastName}
            label={"Last Name"}
            type={"text"}
            name={"lastName"}
          />
          {state?.lastNameError && (
            <p className="text-red-600 text-sm absolute left-16 -bottom-6">
              {state?.lastNameErrorMessage}
            </p>
          )}
        </div>
        <div className="relative w-full flex items-center justify-center ">
          <Input
            ref={emailRef}
            dispatch={dispatch}
            error={state?.emailError}
            inputData={state?.data?.email}
            label={"Email"}
            name={"email"}
            type={"text"}
          />
          {state?.emailError && (
            <p className="text-red-600 text-sm absolute left-16 -bottom-6">
              {state?.emailErrorMessage}
            </p>
          )}
        </div>
        <div className="relative w-full flex items-center justify-center ">
          <Input
            ref={passwordRef}
            dispatch={dispatch}
            error={state?.passwordError}
            inputData={state?.data?.password}
            label={"Password"}
            type={"password"}
            name={"password"}
          />
          {state?.passwordError && (
            <p className="text-red-600 text-sm absolute left-16 -bottom-6">
              {state?.passwordErrorMessage}
            </p>
          )}
        </div>
        <div className="relative w-full flex items-center justify-center ">
          <Input
            ref={confirmPasswordRef}
            dispatch={dispatch}
            error={state?.confirmPasswordError}
            inputData={state?.data?.confirmPassword}
            label={"Confirm Password"}
            type={"password"}
            name={"confirmPassword"}
          />
          {state?.confirmPasswordError && (
            <p className="text-red-600 text-sm absolute left-16 -bottom-6">
              {state?.confirmPasswordErrorMessage}
            </p>
          )}
        </div>

        <Button
          isPending={isPending}
          text={"Register"}
          className="btn-custom disabled:bg-purple-500 "
          type="submit"
          action="Registering..."
        />

        <div className="absolute -top-4 -right-4 ">
          <IoClose
            onClick={handelClick}
            className=" cursor-pointer p-2 rounded-full
                     transition-all duration-300 hover:bg-purple-600
                     w-12 h-12  text-stone-50 bg-purple-700 shadow-custom-shadow"
          />
        </div>
      </form>
      {isRegister && <Loading />}
    </main>
  );
};

export default Register;
