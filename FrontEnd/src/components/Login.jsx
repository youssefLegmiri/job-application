import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";
import clsx from "clsx";
import google from "../assets/google.svg";
import facebook from "../assets/facebook.svg";
import { useNavigate } from "react-router-dom";
import { useActionState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [state, actionFunction, isPending] = useActionState(formAction, "");

  async function formAction(previous, formData) {
    const jsonData = Object.fromEntries(formData.entries());

    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  return (
    <main className="w-full h-full flex justify-center items-center ">
      <form
        action={actionFunction}
        className="h-[50%] w-[80%] min-h-[600px] p-2  flex flex-col justify-around items-center
                      border-[1px] border-purple-500 rounded-lg  bg-purple-100
                      xl:w-[30%] lg:w-[50%] md:w-[60%] "
      >
        <h1 className="text-2xl text-purple-700 font-bold">Login</h1>
        <Input
          autofocus={"autofocus"}
          name={"email"}
          type={"email"}
          label={"Email"}
        />
        <Input name={"password"} type={"password"} label={"Password"} />
        <div className="flex md:w-[50%] w-[80%] justify-around ">
          <Link to={"/"}>
            <p className="text-lg font-[500] text-purple-600 hover:text-purple-500">
              Forgot password ?
            </p>
          </Link>
        </div>
        <Button
          action={"Logging..."}
          isPending={isPending}
          type={"submit"}
          text={"Login"}
          className={"btn-custom disabled:bg-purple-400"}
        />
        <div className="md:w-[60%] w-[80%] xl:w-[90%] text-purple-600 text-lg flex justify-evenly items-center">
          <p className=" ">Don't have an account ?</p>
          <Link className="text-purple-800 hover:text-purple-600" to={"/"}>
            Sign up
          </Link>
        </div>
        {/* horizental line   */}
        <div className="w-[80%]  flex items-center justify-between">
          <div className=" w-[40%] h-[1px] bg-gray-400 "></div>
          <span className="text-gray-400">Or</span>
          <div className="w-[40%] h-[1px] bg-gray-400"></div>
        </div>
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
      </form>
    </main>
  );
};

export default Login;
