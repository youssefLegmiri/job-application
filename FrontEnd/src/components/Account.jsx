import { useNavigate } from "react-router-dom";
import Close from "./Close";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "./AuthProvider";
import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import Button from "./Button";
import { useActionState } from "react";
import Loading from "./Loading";
const Account = () => {
  const [state, actionFunction, isPending] = useActionState(formAction, {});
  const [readFile, setReadFile] = useState(null);
  const [file, setFile] = useState(null);
  const { user, response, setResponse, isSaving, setIsSaving } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  const handleImageChange = async (event) => {
    // set up for reading file
    const myFile = event.target.files[0];
    setFile(myFile);
    if (myFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setReadFile(reader.result);
      };
      reader.readAsDataURL(myFile);
    }
  };
  async function formAction(previous, formData) {
    // set up to upload the file to server
    formData.append("profileImage", file);

    try {
      const res = await fetch("http://localhost:5000/UpdateProfile", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const response = await res.json();
      setIsSaving(true);
      if (res.ok) {
        setResponse({
          message: response.message,
        });
      } else {
        setResponse({
          error: response.message,
        });
      }
    } catch (error) {
      setResponse({
        error: "something went wrong please try again",
      });
    }
  }
  return (
    <main className="w-screen h-screen flex items-center justify-center  ">
      <motion.form
        action={actionFunction}
        initial={{ scale: 0, rotate: "45deg" }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: "45deg" }}
        className="relative w-[75%] h-[75%] pt-4 flex flex-col items-center justify-around  rounded-lg bg-stone-50 border-[1px] border-purple-500 shadow-2xl "
      >
        <div className="w-[80%] h-[30%]  flex flex-col items-center justify-around">
          <div className="relative ">
            <div className=" w-24 h-24 overflow-hidden flex items-center justify-center text-gray-600 bg-stone-300 rounded-full">
              {readFile ? (
                <img
                  className="w-[100%] rounded-full "
                  src={readFile}
                  alt="profile"
                />
              ) : user?.profileImage ? (
                <img
                  className="w-[100%]  rounded-full "
                  src={user?.profileImage}
                  alt="profile"
                />
              ) : (
                <div>
                  <FaUser size={"40"} />
                </div>
              )}
            </div>
            <label
              htmlFor="profileImage"
              className="w-10 h-10 flex items-center justify-center p-2 bg-stone-50  rounded-full absolute -bottom-2 right-0"
            >
              <FaCamera
                size={"30"}
                className="cursor-pointer text-stone-600 transition-all duration-300 hover:scale-125 "
              />
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="profileImage"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <h1 className="text-purple-800 font-[500] ">
            {`${user?.firstName} ${user?.lastName}`}
          </h1>
        </div>
        <div className=" flex flex-col justify-around items-center w-[90%] h-[50%] rounded-xl bg-purple-200 ">
          <div className="w-[90%] flex justify-around">
            <label> First Name</label>
            <input type="text" name="firstName" placeholder={user?.firstName} />
          </div>
        </div>
        <Button type="submit" className="btn-custom " text={"Save"} />
        <Close handelClick={handleClick} />
      </motion.form>
      {(isPending || isSaving) && <Loading text={"saving ..."} />}
    </main>
  );
};

export default Account;
