import { useContext, useEffect, useState, useActionState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { AuthContext } from "./AuthProvider";
import { useParams, Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import SkeletonJobDetails from "./SkeletonJobDetails";
const JobDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    user,
    isError,
    setIsError,
    isUpdate,
    setIsUpdate,
    isLoading,
    setIsLoading,
    isApply,
    setIsApply,
    setResponse,
  } = useContext(AuthContext);
  const [myJob, setMyJob] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  useEffect(() => {
    if (!user?.firstName) navigate("/");
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsLoading(false);
        if (res.status === 200) {
          setMyJob(data.selectedJob);
          setIsApplied(data.isApplied);
        } else {
          setIsError(true);
          setResponse({ message: data.message });
          setTimeout(() => {
            setIsError(false);
            navigate("/jobs");
          }, 2000);
        }
      } catch (error) {
        navigate("/jobs");
        setIsError(true);
        setResponse({ error: "please check your connection and try again" });
      }
    };
    fetchData();
  }, []);
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
        setMyJob(data);
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
        setIsApplied(data.isApplied);
        setResponse({ message: data.message });
      } else {
        setResponse({ message: data.message });
      }
    } catch (error) {
      console.log(error);
      setResponse({ error: "Something went wrong please try again" });
    }
  };
  const handleNavigate = () => {
    navigate("/jobs");
  };
  return (
    <main className="w-full  py-4 flex flex-col items-center ">
      {!isLoading ? (
        <div
          className=" relative p-4 mb-10 w-[80%] min-h-[700px] rounded-xl 
      shadow-custom-shadow bg-purple-100   flex flex-col md:items-center
        justify-evenly text-purple-600 font-[500] "
        >
          <FaArrowAltCircleLeft
            onClick={handleNavigate}
            size={"40"}
            className="absolute top-4 left-4 cursor-pointer transition-all duration-100 ease-in-out  hover:scale-110"
          />
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
            <span className="jobTitle ">Salary :</span> {`${myJob?.salary}  `}
          </h1>
          <h1 className="jobItems">
            <span className="jobTitle ">Experience :</span>{" "}
            {`${myJob?.experience}`}
          </h1>
          {user?.role === "admin" ? (
            ""
          ) : !isApplied ? (
            <button
              onClick={handleApplication}
              className="absolute bottom-2 right-4 btn-custom cursor-pointer"
            >
              Apply
            </button>
          ) : (
            <div className="absolute bottom-4 right-6  text-green-600  ">
              Applied
            </div>
          )}
          {user?.role === "admin" && (
            <button
              onClick={handleEdit}
              className="absolute bottom-2 right-4 btn-custom p-0 w-24 h-10"
            >
              {isEdit ? "Close" : "Edit"}
            </button>
          )}
        </div>
      ) : (
        <SkeletonJobDetails />
      )}

      {user?.role === "admin" && isEdit && (
        <form
          className=" bg-purple-200 mb-8 border-[1px] border-purple-600 shadow-custom-shadow rounded-lg w-[80%]  min-h-[600px] flex flex-col justify-around items-center "
          action={actionFunction}
        >
          <div className="input-container w-[90%] md:w-[60%] ">
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
          <div className="input-container w-[90%] md:w-[60%]">
            <label htmlFor="">Location</label>
            <input
              defaultValue={myJob?.location}
              required
              name="location"
              type="text"
              className="input"
            />
          </div>
          <div className="input-container w-[90%] md:w-[60%]">
            <label htmlFor="">Brief Description</label>
            <input
              defaultValue={myJob?.briefDescription}
              required
              name="briefDescription"
              type="text"
              className="input"
            />
          </div>
          <div className="input-container w-[90%] md:w-[60%]">
            <label htmlFor="">Description</label>
            <input
              defaultValue={myJob?.description}
              required
              name="description"
              type="text"
              className="input"
            />
          </div>
          <div className="input-container w-[90%] md:w-[60%]">
            <label htmlFor="">Salary</label>
            <input
              defaultValue={myJob?.salary}
              required
              name="salary"
              type="text"
              className="input"
            />
          </div>
          <div className="input-container w-[90%] md:w-[60%]">
            <label htmlFor="">Experience</label>
            <input
              defaultValue={myJob?.experience}
              required
              name="experience"
              type="text"
              className="input"
            />
          </div>
          <button className="btn-custom mb-4"> Save </button>
        </form>
      )}
      {(isUpdate || isPending) && <Loading text={"Updating Job ..."} />}
      {isApply && <Loading text={"Applying ..."} />}
      {isError && <Loading />}
    </main>
  );
};

export default JobDetails;
