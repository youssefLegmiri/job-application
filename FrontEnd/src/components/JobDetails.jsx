import { useContext, useEffect, useState, useActionState } from "react";
import { AuthContext } from "./AuthProvider";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
const JobDetails = () => {
  const { id } = useParams();
  const {
    jobs,
    setJobs,
    user,
    isUpdate,
    setIsUpdate,
    isApply,
    setIsApply,
    setResponse,
  } = useContext(AuthContext);
  const [myJob, setMyJob] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const jobFiltered = jobs.filter((job) => job._id === id);
    setMyJob(jobFiltered[0]);
  }, [jobs]);
  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const [state, actionFunction, isPending] = useActionState(formAction, {});

  async function formAction(previuos, formData) {
    const jsonData = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(jsonData),
      });
      const data = await res.json();
      setIsUpdate(true);
      if (res.status === 200) {
        const updatedJob = jobs.map((job) =>
          job._id === data._id ? { ...job, ...data } : job
        );
        setJobs(updatedJob);
        setResponse({ message: "Job has been updated successfully" });
      } else {
        setResponse({ message: data.message });
      }
    } catch (error) {
      setResponse({ error: "Something went wrong please try again" });
    }
  }
  const handleApplication = async () => {
    setIsApply(true);
    try {
      const res = await fetch(`http://localhost:5000/api/application/${id}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (res.status === 200) {
        setResponse({ message: data.message });
      } else {
        setResponse({ message: data.message });
      }
    } catch (error) {
      console.log(error);
      setResponse({ error: "Something went wrong please try again" });
    }
  };
  return (
    <main className="w-full min-h-screen  py-4 flex flex-col items-center ">
      <div
        className=" relative p-4 mb-10 w-[80%] min-h-[500px] rounded-xl 
      shadow-custom-shadow bg-purple-50  flex flex-col md:items-center
        justify-evenly text-purple-600 font-[500] "
      >
        <h1 className="jobItems  ">
          <span className="jobTitle ">Title :</span>
          {` ${myJob?.title}`}
        </h1>
        <h1 className="jobItems">
          <span className="jobTitle ">Location :</span> {`${myJob?.location}`}{" "}
        </h1>
        <h1 className="jobItems">
          <span className="jobTitle ">Description :</span>
          {` ${myJob?.description}`}
        </h1>
        <h1 className="jobItems">
          <span className="jobTitle ">Salary :</span> {`${myJob?.salary} MAD `}{" "}
        </h1>
        {user?.role != "admin" && (
          <button
            onClick={handleApplication}
            className="absolute bottom-2 right-4 cursor-pointer"
          >
            apply
          </button>
        )}
        {user?.role === "admin" && (
          <p
            onClick={handleEdit}
            className="absolute bottom-2 right-4 cursor-pointer"
          >
            Edit
          </p>
        )}
      </div>

      {user?.role === "admin" && isEdit && (
        <form
          className=" bg-purple-200 mb-8 border-[1px] border-purple-600 shadow-custom-shadow rounded-lg w-[80%]  min-h-[500px] flex flex-col justify-around items-center "
          action={actionFunction}
        >
          <div className="input-container">
            <label htmlFor="">Title</label>
            <input
              autoFocus
              defaultValue={myJob?.title}
              required
              name="title"
              type="text"
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="">Location</label>
            <input
              defaultValue={myJob?.location}
              required
              name="location"
              type="text"
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="">Brief Description</label>
            <input
              defaultValue={myJob?.briefDescription}
              required
              name="briefDescription"
              type="text"
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="">Description</label>
            <input
              defaultValue={myJob?.description}
              required
              name="description"
              type="text"
              className="input"
            />
          </div>
          <div className="input-container">
            <label htmlFor="">Salary</label>
            <input
              defaultValue={myJob?.salary}
              required
              name="salary"
              type="text"
              className="input"
            />
          </div>
          <button className="btn-custom mb-4"> Save </button>
        </form>
      )}
      {(isUpdate || isPending) && <Loading text={"Updating Job ..."} />}
      {isApply && <Loading text={"Applying ..."} />}
    </main>
  );
};

export default JobDetails;
