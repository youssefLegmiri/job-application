import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import ToolTip from "./ToolTip";
const Job = ({ job, handleDelete }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isToolTip, setIsToolTip] = useState(false);
  const handleMouseEnter = () => {
    setIsToolTip(true);
  };
  const handleMouseLeave = () => {
    setIsToolTip(false);
  };
  const handleClick = () => {
    if (user.firstName === "Guest") {
      navigate("/login");
    } else {
      navigate(`${job?._id}`);
    }
  };
  return (
    <motion.div
      whileHover={user?.role != "admin" && { scale: 0.95 }}
      className=" relative  w-[100%] h-60 rounded-xl shadow-custom-shadow  bg-purple-50 flex flex-col 
    items-center justify-evenly text-purple-900 font-[400] cursor-pointer  "
    >
      {user?.role != "admin" && (
        <div className="absolute top-2 left-2 rounded-lg text-lg text-purple-50 bg-purple-600 p-1 ">
          Job offer
        </div>
      )}
      {user?.role != "admin" && (
        <motion.div
          className="absolute inset-0 z-10 rounded-xl  flex justify-center items-center
                     hover:bg-opacity-20 hover:bg-black"
          initial={{ opacity: 0 }}
          whileHover={{
            opacity: 1,
          }}
          onClick={handleClick}
        >
          <p className="text-purple-50 bg-purple-600  rounded-xl font-[400]  p-2">
            View details
          </p>
        </motion.div>
      )}
      {user?.role === "admin" && (
        <Link
          className="absolute top-2 left-2 text-[1rem]  
           font-[500] text-purple-100 bg-purple-600 px-1
           hover:bg-purple-800 rounded-md
            "
          to={`${job?._id}`}
        >
          See Details
        </Link>
      )}
      <h1>{job?.title} </h1>
      <p>{job?.briefDescription} </p>
      <div className="w-full absolute bottom-4 flex items-center justify-evenly text-sm ">
        <h2>{`Location : ${job.location} `} </h2>
        <h3>{`Experience : ${job.experience}`} </h3>
      </div>

      {user?.role === "admin" && (
        <div className="">
          <MdDelete
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleDelete(job._id)}
            size={"40"}
            className="absolute top-2 right-2 z-10 cursor-pointer text-purple-600 p-1 rounded-lg transition-all duration-300 ease-in-out hover:bg-purple-200"
          />
          {isToolTip && <ToolTip text={"Delete Job"} />}
        </div>
      )}
    </motion.div>
  );
};

export default Job;
