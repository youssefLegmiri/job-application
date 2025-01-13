import Lottie from "react-lottie-player";
import animationData from "../assets/animation/Loading.json";
const LoaderSpinner = () => {
  return (
    <>
      <Lottie className="w-[100px]" play animationData={animationData} />
    </>
  );
};

export default LoaderSpinner;
