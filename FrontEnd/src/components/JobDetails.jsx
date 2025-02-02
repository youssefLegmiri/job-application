import { useContext, useEffect, useState, useActionState } from "react";
import { AuthContext } from "./AuthProvider";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";
const JobDetails = () => {
  const { id } = useParams();
  const { jobs, setJobs, user, isUpdate, setIsUpdate, setResponse } =
    useContext(AuthContext);
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
        setJobs([...jobs, data]);
        setResponse({ message: "Job has been updated successfully" });
      }
    } catch (error) {
      setResponse({ error: "Something went wrong please try again" });
    }
  }
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-around">
      <div className=" relative p-4 w-[80%] h-60 rounded-xl shadow-custom-shadow bg-purple-50 flex flex-col items-center justify-evenly text-purple-600 font-[500] ">
        <h1> {myJob?.title} </h1>
        <h1> {myJob?.location} </h1>
        <h1> {myJob?.description} </h1>
        <h1> {`Salary : ${myJob?.salary} MAD `} </h1>
        {user?.role != "admin" && (
          <p className="absolute bottom-2 right-4 cursor-pointer">apply</p>
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
    </main>
  );
};

export default JobDetails;
