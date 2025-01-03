import Input from "./Input";
import Button from "./Button";
import { useReducer } from "react";
import { useActionState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
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
  const [data, actionFunction, isPending] = useActionState(formAction, {});
  const validateInput = (formData) => {
    const jsonData = Object.fromEntries(formData.entries());
    if (!jsonData.firstName) {
      dispatch({ type: "emptyFirstName", payload: {} });
    }
  };
  function errorHandler(state, action) {
    switch (action.type) {
      case "emptyFirstName":
        return {
          firstNameError: true,
          firstNameErrorMessage: "FirstName is required !",
        };
    }
  }
  async function formAction(previousState, formData) {}

  const handelClick = () => {
    navigate("/login");
  };
  return (
    <main className="w-screen h-screen bg-purple-200 flex justify-center items-center">
      <form
        className="h-[80%] w-[80%] relative min-h-[600px] p-2  flex flex-col justify-around items-center
                      border-[1px] border-purple-500 rounded-lg  bg-purple-50 shadow-xl
                      xl:w-[30%] lg:w-[50%] md:w-[60%]"
        action={validateInput}
      >
        <h1 className="text-purple-600 font-bold">Sign Up</h1>
        <div className="relative w-full flex items-center justify-center ">
          <Input
            dispatch={dispatch}
            error={state?.firstNameError}
            inputData={state?.data?.firstName}
            label={"FirstName"}
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
        <Input label={"LastName"} type={"text"} name={"lastName"} />
        <Input label={"Email"} name={"email"} type={"text"} />
        <Input label={"password"} type={"password"} name={"password"} />
        <Input
          label={"confirm password"}
          type={"password"}
          name={"confirmPassword"}
        />
        <Button
          text={"Register"}
          className="btn-custom"
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
    </main>
  );
};

export default Register;
