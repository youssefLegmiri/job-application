import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import LoaderSpinner from "./LoaderSpinner";
import Close from "./Close";
import Button from "./Button";
const Loading = ({ text, handleDelete }) => {
  const {
    response,
    setIsLogin,
    setIsLogout,
    setIsRegister,
    setIsSaving,
    setResponse,
    setIsDelete,
    isDelete,
    setIsUpdate,
    setIsApply,
    setIsSubmit,
    setIsDeleteJob,
    setIsSavingJob,
    setIsLoading,
  } = useContext(AuthContext);
  const handelClick = () => {
    {
      setIsLogout(false);
      setIsLogin(false);
      setIsRegister(false);
      setIsSaving(false);
      setIsDelete(false);
      setIsSubmit(false);
      setIsDeleteJob(false);
      setIsSavingJob(false);
      setIsUpdate(false);
      setIsApply(false);
      setIsLoading(false);
      setResponse({
        message: "",
        error: "",
      });
    }
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed -inset-0 z-10  flex justify-center items-center bg-zinc-700 bg-opacity-50 backdrop-blur-sm  ">
      <div
        className="relative w-[80%] xl:w-[30%] lg:w-[50%] md:w-[60%] h-[20%] min-h-[150px] 
                    bg-purple-100 shadow-custom-shadow rounded-xl flex flex-col items-center justify-evenly
                      "
      >
        {response.error ? (
          ""
        ) : response.message ? (
          ""
        ) : (
          <div className=" flex flex-col items-center">
            <LoaderSpinner />
            <p className="text-purple-600 text-2xl font-[500] ">{text} </p>
          </div>
        )}
        {response.error && (
          <p className="text-purple-600 text-xl font-[500] text-center ">
            {response.error}
          </p>
        )}
        {response.message && (
          <p className="text-purple-600 text-xl font-[500] text-center ">
            {response.message}
          </p>
        )}
        {isDelete && response?.message?.startsWith("Are") && (
          <Button
            onClick={handleDelete}
            type="button"
            text={"Yes"}
            className="btn-custom p-1 w-20 rounded-lg"
          />
        )}
        {(response.error || response.message) && (
          <Close handelClick={handelClick} />
        )}
      </div>
    </div>
  );
};

export default Loading;
