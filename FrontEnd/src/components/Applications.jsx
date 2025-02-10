import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Applications = () => {
  const navigate = useNavigate();
  const { setResponse, isLoading, setIsLoading, user } =
    useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [jobApplicants, setJobApplicants] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/application", {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setApplications(data);
        setIsLoading(false);
        if (res.status === 200) {
        }
      } catch (error) {
        setResponse({ error: "Something went wrong please try again" });
      }
    };
    fetchData();
  }, []);
  const handleChange = (jobID, userEmail, newStatus) => {
    setJobApplicants((prev) => ({
      ...prev,
      [jobID]: {
        ...prev[jobID],
        [userEmail]: newStatus,
      },
    }));
  };
  const SendData = async () => {
    setIsLoading(true);
    const formattedData = Object.entries(jobApplicants).map(
      ([jobID, users]) => ({
        jobID,
        updates: Object.entries(users).map(([userEmail, newStatus]) => ({
          userEmail,
          newStatus,
        })),
      })
    );
    try {
      const res = await fetch("http://localhost:5000/api/application", {
        method: "POST",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formattedData),
      });
      const response = await res.json();
      if (res.status === 200) {
        setJobApplicants([]);
        setResponse({ message: response.message });
      } else if (res.status === 400) {
        setResponse({ error: response.message });
      } else {
        setResponse({ error: "Server Error" });
      }
      console.log(response.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full p-8 grid grid-cols-1  xl:grid-cols-2   gap-2">
      {applications?.map((application) => (
        <div
          className="bg-stone-400 flex flex-col  justify-around min-h-[600px] p-4 overflow-x-auto rounded-xl"
          key={application._id}
        >
          <div className="p-2 mb-2 bg-stone-300 h-[100px] flex flex-col  justify-around font-[500] text-purple-600 ">
            <h1>Job Reference : {application.jobReference}</h1>
            <h1>Job Title : {application.jobTitle}</h1>
          </div>
          <p className="w-40 font-[500] px-2 mb-2 bg-stone-300 text-purple-600 ">
            Applicants :
          </p>
          <table className=" ">
            <thead>
              <tr className="">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {application.applicants.map((applicant, index) => (
                <tr key={index}>
                  <td>{applicant.firstName}</td>
                  <td>{applicant.lastName}</td>
                  <td>{applicant.email}</td>
                  <td className="relative">
                    <select
                      className="w-full bg-stone-100 rounded-lg outline-none appearance-none cursor-pointer p-2 "
                      name="status"
                      value={jobApplicants[application._id]?.[applicant.email]}
                      onChange={(e) =>
                        handleChange(
                          application._id,
                          applicant.email,
                          e.target.value
                        )
                      }
                    >
                      <option value={applicant.status}>
                        {applicant.status}
                      </option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Pending">Pending</option>
                    </select>
                    <IoIosArrowDown
                      size={"30"}
                      className="absolute top-5 right-5  pointer-events-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {isLoading && (
        <Loading
          text={`${jobApplicants.length === 0 ? "loading..." : "saving..."} `}
        />
      )}
      <button
        disabled={jobApplicants.length === 0 ? true : false}
        onClick={SendData}
        className="btn-custom disabled:bg-purple-500"
      >
        Save
      </button>
    </div>
  );
};

export default Applications;
