import { useContext, useEffect, useState } from "react";
import { useActionState } from "react";
import { AuthContext } from "./AuthProvider";
import { z } from "zod";
import Loading from "./Loading";
import Job from "./Job";

const Admin = () => {
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    setResponse,
    isSavingJob,
    setIsSavingJob,
    isDeleteJob,
    setIsDeleteJob,
    isLoading,
    setIsLoading,
  } = useContext(AuthContext);
  const [state, actionFunction, isPending] = useActionState(formAction, {
    data: {
      title: "",
      location: "",
      briefDescription: "",
      description: "",
      salary: "",
      reference: "",
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
          setResponse({ message: "Server error" });
        }
      } catch (error) {
        setResponse({ error: "Something went wrong" });
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
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <main className="w-[80%]  my-4 py-8 rounded-lg bg-purple-300  flex flex-col items-center justify-around ">
      <div className="relative w-[100%] mb-20 ">
        <button className="absolute top-2 left-8 btn-custom p-0 w-[150px] h-[50px]  hover:bg-purple-700 ">
          {`Admin : ${user?.firstName}`}
        </button>

        <button
          onClick={handleOpen}
          className="absolute top-2 right-8 btn-custom p-0 w-[100px] h-[50px]  "
        >
          {isOpen ? "Close" : "Add Job"}
        </button>
      </div>
      {isOpen && (
        <form
          className=" bg-purple-100 mb-8 py-4 border-[1px] border-purple-600 shadow-custom-shadow rounded-lg w-[80%]  min-h-[500px] flex flex-col items-center lg:items-start lg:flex-row justify-evenly "
          action={actionFunction}
        >
          <div className="w-[80%] h-full lg:w-[60%] flex flex-col justify-around  ">
            <div className="input-container ">
              <label htmlFor="">Title :</label>
              <input
                autoFocus
                defaultValue={state?.data?.title}
                required
                name="title"
                type="text"
                className="input"
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Location :</label>
              <input
                defaultValue={state?.data?.location}
                required
                name="location"
                type="text"
                className="input"
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Brief Description :</label>
              <input
                defaultValue={state?.data?.briefDescription}
                required
                name="briefDescription"
                type="text"
                className="input"
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Description :</label>
              <input
                defaultValue={state?.data?.description}
                required
                name="description"
                type="text"
                className="input"
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Salary :</label>
              <input
                defaultValue={state?.data?.salary}
                required
                name="salary"
                type="text"
                className="input"
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Experience :</label>
              <input
                defaultValue={state?.data?.experience}
                required
                name="experience"
                type="text"
                className="input"
              />
            </div>
          </div>
          <div className="w-[80%] lg:w-[30%] h-full  flex flex-col items-center justify-around  ">
            <div className="input-container ">
              <label htmlFor="">Reference</label>
              <input
                defaultValue={state?.data?.reference}
                required
                name="reference"
                type="text"
                className="input"
              />
            </div>
            <div className="w-full text-purple-900 flex flex-col justify-around ">
              <label htmlFor="">Category :</label>
              <select
                className="my-4 p-1 outline-none rounded-md border-[1px] border-purple-500 "
                name="category"
              >
                <option value="managment">Managment</option>
                <option value="electric">Electric</option>
                <option value="it">IT</option>
                <option value="process">Process</option>
              </select>
            </div>
            <button className="btn-custom "> Save </button>
          </div>
        </form>
      )}

      <div className=" w-[90%] grid grid-cols-1 lg:grid-cols-2   gap-4 justify-items-center ">
        {jobs.length != 0 ? (
          jobs.map((job, index) => (
            <Job
              key={index}
              job={job}
              handleDelete={() => handleDelete(job._id)}
            />
          ))
        ) : (
          <p className="text-purple-700 font-[500] ">No job to display</p>
        )}
      </div>
      {(isPending || isSavingJob) && <Loading text={"Saving job..."} />}
      {isDeleteJob && <Loading text={"Deleting job ..."} />}
      {isLoading && <Loading text={"Loading..."} />}
    </main>
  );
};

export default Admin;
