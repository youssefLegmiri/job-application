import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useParams, Link } from "react-router-dom";
const JobDetails = () => {
  const { id } = useParams();
  const { jobs, user } = useContext(AuthContext);
  const [myJob, setMyJob] = useState(null);
  useEffect(() => {
    const jobFiltered = jobs.filter((job) => job._id === id);

    setMyJob(jobFiltered[0]);
  }, []);
  return (
    <div className=" relative p-2 w-[60%] h-60 rounded-xl shadow-custom-shadow bg-purple-50 flex flex-col items-center justify-evenly text-purple-600 font-[500] ">
      <h1> {myJob?.title} </h1>
      <h1> {myJob?.location} </h1>
      <h1> {myJob?.description} </h1>
      <h1> {myJob?.salary} </h1>
      {user?.role != "admin" && (
        <p className="absolute bottom-2 right-4 cursor-pointer">apply</p>
      )}
      {user?.role === "admin" && (
        <p className="absolute bottom-2 right-4 cursor-pointer">Edit</p>
      )}
    </div>
  );
};

export default JobDetails;
