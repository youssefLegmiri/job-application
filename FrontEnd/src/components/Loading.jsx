import Button from "./Button";
import { useNavigate } from "react-router-dom";
const Loading = ({ response }) => {
  const navigate = useNavigate();
  const handelClick = () => {
    navigate("/login");
  };
  return (
    <div className="w-screen h-screen absolute flex justify-center items-center bg-zinc-700 bg-opacity-50  ">
      <div className=" w-[80%] xl:w-[30%] lg:w-[50%] md:w-[60%] h-[20%] bg-purple-50 rounded-xl flex flex-col items-center justify-around ">
        <p className="text-green-50 p-1 rounded-lg bg-green-500 text-lg font-[500] ">
          {response?.message}
        </p>
        <Button
          onClick={handelClick}
          text={"Close"}
          className="btn-custom"
          type="button"
        />
      </div>
    </div>
  );
};

export default Loading;
