import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
const Job = ({ job, handleDelete }) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      className=" relative p-2 w-[100%] h-60 rounded-xl shadow-custom-shadow bg-purple-50 flex flex-col 
    items-center justify-evenly text-purple-900 font-[400] "
    >
      <div className="absolute top-2 left-2 text-lg text-purple-50 bg-purple-600 p-1 ">
        Job offer
      </div>
      <h1>{job?.title} </h1>
      <p>{job?.description} </p>
      <div className="w-full absolute bottom-4 flex items-center justify-evenly text-lg ">
        <h2>{`Location : ${job.location} `} </h2>
        <h3>{`Salary : ${job.salary} MAD `} </h3>
      </div>
      <Link to={`/jobs/${job._id}`}></Link>
      {user?.role === "admin" && (
        <MdDelete
          onClick={() => handleDelete(job._id)}
          size={"40"}
          className="absolute top-2 right-2 cursor-pointer p-1 hover:bg-purple-200"
        />
      )}
    </div>
  );
};

export default Job;
