import { useNavigate } from "react-router-dom";
import Close from "./Close";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "./AuthProvider";
import { useContext, useState, useActionState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import Button from "./Button";
import CustomCheck from "./CustomCheck";
import Loading from "./Loading";
import DeleteAccount from "./DeleteAccount";
const Account = () => {
  const [state, actionFunction, isPending] = useActionState(formAction, {});
  const [readFile, setReadFile] = useState(null);
  const [file, setFile] = useState(null);
  const [isEdit, setIsEdit] = useState(true);
  const inputRef = useRef(null);
  const { user, setResponse, isSaving, setIsSaving, isDelete } =
    useContext(AuthContext);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);
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
      } else if (res.status === 403) {
        setResponse({
          error: "You are unauthorized, please login",
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

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  return (
    <main className="w-screen h-screen flex items-center justify-center  ">
      <motion.form
        action={actionFunction}
        initial={{ scale: 0, rotate: "45deg" }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: "45deg" }}
        className="relative w-[75%] h-[75%] min-h-[600px] pt-4 flex flex-col md:flex-row md:items-center md:justify-evenly items-center justify-around  rounded-lg bg-stone-50 border-[1px] border-purple-500 shadow-2xl "
      >
        <CustomCheck isEdit={isEdit} setIsEdit={setIsEdit} ref={inputRef} />
        <div className=" h-[20%]  flex flex-col items-center justify-center">
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
          <h1 className="text-purple-800 font-[500] mt-6 ">
            {`${user?.firstName} ${user?.lastName}`}
          </h1>
          {user?.role === "admin" && (
            <h2 className="text-green-700 font-[500] ">{user?.role} </h2>
          )}
        </div>
        <div className=" flex flex-col  justify-around items-center w-[90%] h-[50%] md:w-[60%]  md:h-[80%] rounded-xl bg-purple-200 ">
          <div className="input-container">
            <label> First Name</label>
            <input
              ref={inputRef}
              className="input "
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleFirstName}
              disabled={isEdit}
              required
            />
          </div>
          <div className="input-container">
            <label> Last Name</label>
            <input
              className="input"
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleLastName}
              disabled={isEdit}
              required
            />
          </div>
          <Button
            isDisabled={isEdit}
            type="submit"
            className="btn-custom  "
            text={"Save"}
          />
        </div>
        {!isEdit && user?.role != "admin" && <DeleteAccount />}
        <Close handelClick={handleClick} />
      </motion.form>
      {(isPending || isSaving) && <Loading text={"saving ..."} />}
    </main>
  );
};

export default Account;
