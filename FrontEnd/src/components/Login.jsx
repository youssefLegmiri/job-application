import Input from "./Input";
import Button from "./Button";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [state, actionFunction, isPending] = useActionState(formAction, "");

  async function formAction(previous, formData) {
    const jsonData = Object.fromEntries(formData.entries());
  }
  return (
    <main className="w-full h-full flex justify-center items-center ">
      <form
        action={actionFunction}
        className="h-[50%] w-[80%] min-h-[400px] p-2  flex flex-col justify-around items-center
                      border-[1px] border-purple-500 rounded-lg  bg-purple-100
                      xl:w-[30%] md:w-[60%] "
      >
        <Input
          autofocus={"autofocus"}
          name={"email"}
          type={"email"}
          label={"Email"}
        />
        <Input name={"password"} type={"password"} label={"Password"} />
        <Button type={"submit"} text={"Login"} className={"btn-custom"} />
      </form>
    </main>
  );
};

export default Login;
