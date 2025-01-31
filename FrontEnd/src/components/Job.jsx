import { MdDelete } from "react-icons/md";

const Job = ({ job, handleDelete }) => {
  return (
    <div className=" relative w-[80%] h-60 rounded-xl shadow-custom-shadow bg-purple-50 flex flex-col items-center justify-evenly text-purple-600 font-[500] ">
      <h1>{job.title} </h1>
      <h2>{job.location} </h2>
      <p>{job.description} </p>
      <h3>{job.salary} </h3>
      <MdDelete
        onClick={() => handleDelete(job._id)}
        size={"40"}
        className="absolute bottom-2 right-2 cursor-pointer p-1 hover:bg-purple-200"
      />
    </div>
  );
};

export default Job;
