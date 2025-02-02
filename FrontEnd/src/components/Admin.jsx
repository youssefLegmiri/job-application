import { useContext, useEffect, useState } from "react";
import { useActionState } from "react";
import { AuthContext } from "./AuthProvider";
import { z } from "zod";
import Loading from "./Loading";
import Job from "./Job";

const Admin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    setResponse,
    isSavingJob,
    setIsSavingJob,
    isDeleteJob,
    setIsDeleteJob,
    jobs,
    setJobs,
  } = useContext(AuthContext);
  const [state, actionFunction, isPending] = useActionState(formAction, {
    data: {
      title: "",
      location: "",
      briefDescription: "",
      description: "",
      salary: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/jobs", {
          credentials: "include",
        });
        const data = await res.json();
        setIsLoading(false);
        if (res.status === 200) {
          setJobs(data);
        } else {
          setResponse({ mesage: data.message });
        }
      } catch (error) {
        setResponse({ error: error.message });
      }
    };
    fetchData();
  }, []);
  async function formAction(previous, formData) {
    const jsonData = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(jsonData),
      });
      const userData = await res.json();
      setIsSavingJob(true);
      if (res.status === 201) {
        setJobs([...jobs, userData.data]);
        setResponse({ message: userData.message });
      } else if (res.status === 400) {
        setResponse({ message: userData.message });
      } else {
        setResponse({ message: userData.message });
      }
    } catch (error) {
      console.log(error);
      setResponse({ message: "Something went wrong please try again" });
      return {
        data: {
          title: jsonData.title,
          location: jsonData.location,
          description: jsonData.description,
          salary: jsonData.salary,
        },
      };
    }
  }

  const handleDelete = async (id) => {
    setIsDeleteJob(true);
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        setJobs(jobs.filter((job) => job._id != id));
        setResponse({ message: data.message });
      } else {
        setResponse({ message: data.message });
      }
    } catch (error) {
      setResponse({ error: error.message });
    }
  };
  const handleClick = () => {
    setIsAdd(!isAdd);
  };
  return (
    <main className="w-full h-[50%] py-8  flex flex-col items-center justify-evenly ">
      <form
        className=" bg-purple-200 mb-8 border-[1px] border-purple-600 shadow-custom-shadow rounded-lg w-[80%]  min-h-[500px] flex flex-col justify-around items-center "
        action={actionFunction}
      >
        <div className="input-container">
          <label htmlFor="">Title</label>
          <input
            defaultValue={state?.data?.title}
            required
            name="title"
            type="text"
            className="input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="">Location</label>
          <input
            defaultValue={state?.data?.location}
            required
            name="location"
            type="text"
            className="input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="">Brief Description</label>
          <input
            defaultValue={state?.data?.briefDescription}
            required
            name="briefDescription"
            type="text"
            className="input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="">Description</label>
          <input
            defaultValue={state?.data?.description}
            required
            name="description"
            type="text"
            className="input"
          />
        </div>
        <div className="input-container">
          <label htmlFor="">Salary</label>
          <input
            defaultValue={state?.data?.salary}
            required
            name="salary"
            type="text"
            className="input"
          />
        </div>
        <button className="btn-custom mb-4"> Save </button>
      </form>

      <div className=" w-[80%] grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 justify-items-center ">
        {jobs.length != 0
          ? jobs.map((job, index) => (
              <Job
                key={index}
                job={job}
                handleDelete={() => handleDelete(job._id)}
              />
            ))
          : "No job to display"}
      </div>
      {(isPending || isSavingJob) && <Loading text={"Saving job..."} />}
      {isDeleteJob && <Loading text={"Deleting job ..."} />}
      {isLoading && <Loading text={"Loading..."} />}
    </main>
  );
};

export default Admin;
