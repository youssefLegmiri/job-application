import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";
const Job = ({ job, handleDelete }) => {
  const { user } = useContext(AuthContext);
  return (
    <div className=" relative p-2 w-[80%] h-60 rounded-xl shadow-custom-shadow bg-purple-50 flex flex-col items-center justify-evenly text-purple-600 font-[500] ">
      <h1>{job.title} </h1>
      <h2>{job.location} </h2>
      <h3>{job.salary} </h3>
      <Link to={`/jobs/${job._id}`}>
        <h4 className="text-lg cursor-pointer underline underline-offset-4 text-purple-500 absolute bottom-2 left-2">
          See details
        </h4>
      </Link>
      {user?.role === "admin" && (
        <MdDelete
          onClick={() => handleDelete(job._id)}
          size={"40"}
          className="absolute bottom-2 right-2 cursor-pointer p-1 hover:bg-purple-200"
        />
      )}
    </div>
  );
};

export default Job;
