import Input from "./Input";
import Button from "./Button";
import { useReducer } from "react";
import { useActionState } from "react";
const Register = () => {
  const initialState = {};
  const [state, dispatch] = useReducer(errorHandler, initialState);
  const [data, actionFunction, isPending] = useActionState(formAction, {});

  function errorHandler(state, action) {}
  async function formAction(previousState, formData) {}
  return (
    <main className="w-full h-full mt-2 flex justify-center items-center">
      <form
        className="h-[50%] w-[80%] min-h-[600px] p-2  flex flex-col justify-around items-center
                      border-[1px] border-purple-500 rounded-lg  bg-purple-50
                      xl:w-[30%] lg:w-[50%] md:w-[60%]"
        action={formAction}
      >
        <h1 className="text-purple-600 font-bold">Sign Up</h1>
        <Input
          label={"FirstName"}
          type={"text"}
          name={"firstName"}
          autofocus={true}
        />
        <Input label={"LastName"} type={"text"} name={"lasttName"} />
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
      </form>
    </main>
  );
};

export default Register;
