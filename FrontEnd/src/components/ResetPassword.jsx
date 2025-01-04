import { useRef, useReducer } from "react";
import Input from "./Input";
import Button from "./Button";
import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
const ResetPassword = () => {
  const emailInputRef = useRef(null);
  const navigate = useNavigate();
  const initialState = {
    emailError: false,
    emailErrorMessage: "",
    data: "",
  };
  const [state, dispatch] = useReducer(errorHandler, initialState);
  const [response, actionFunction, isPending] = useActionState(formAction, {});

  const validateEmail = (formData) => {
    const jsonData = Object.fromEntries(formData.entries());
    const emailData = jsonData.email.split(".");
    if (!jsonData.email) {
      emailInputRef.current.focus();
      dispatch({
        type: "EMAIL_EMPTY",
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
        payload: { email: jsonData.email },
      });
    } else {
      dispatch({
        type: "NO_ERROR",
        payload: { email: jsonData.email },
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
          data: action.payload.email,
        };
      case "NO_ERROR":
        return {
          emailError: false,
          emailErrorMessage: "",
          data: action.payload.email,
        };
      case "RESET_ERRORS":
        return {
          emailError: false,
          emailErrorMessage: "",
        };
      default:
        return state;
    }
  }
  async function formAction(previousState, formData) {
    const jsonData = Object.fromEntries(formData.entries());
  }
  const handelClick = () => {
    navigate("/login");
  };
  return (
    <main className="w-screen h-screen  flex justify-center items-center ">
      <form
        className="h-[50%] w-[80%] min-h-[400px] p-2  flex flex-col justify-around items-center
                      border-[1px] border-purple-500 rounded-lg  bg-purple-50 relative
                      xl:w-[30%] lg:w-[50%] md:w-[60%] shadow-2xl "
        action={validateEmail}
      >
        <h1 className="text-purple-600 font-[500] ">Reset Password</h1>
        <div className="relative w-full flex items-center justify-center ">
          <Input
            dispatch={dispatch}
            ref={emailInputRef}
            error={state?.emailError}
            inputData={state?.data}
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
        <Button
          isPending={isPending}
          text={"Submit"}
          className="btn-custom disabled:bg-purple-500"
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
    </main>
  );
};

export default ResetPassword;
