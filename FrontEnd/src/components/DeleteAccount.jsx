import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
const DeleteAccount = () => {
  const navigate = useNavigate();

  const { setResponse, setIsDelete, isDelete, setUser, serverDomain } =
    useContext(AuthContext);

  const handleDelete = async () => {
    setResponse({ message: "", error: "" });
    try {
      const res = await fetch(`${serverDomain}/api/users/DeleteAccount`, {
        method: "DELETE",
        credentials: "include",
      });
      const response = await res.json();
      if (res.ok) {
        navigate("/");
        setUser({});
        setResponse({
          message: response.message,
        });
      } else {
        setResponse({
          message: "Something went wrong",
        });
      }
    } catch (error) {
      setResponse({ error: "something went wrong please try again" });
    }
  };

  const handleClick = () => {
    setResponse({ message: "Are you sure !" });
    setIsDelete(true);
  };
  return (
    <div className="absolute bottom-3 left-4 text-purple-700 cursor-pointer text-lg ">
      <div onClick={handleClick}>Delete account</div>
      {isDelete && <Loading text={"Deleting..."} handleDelete={handleDelete} />}
    </div>
  );
};

export default DeleteAccount;
