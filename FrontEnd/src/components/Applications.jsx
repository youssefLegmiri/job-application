import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
const Applications = () => {
  const navigate = useNavigate();
  const { setResponse, isLoading, setIsLoading, user } =
    useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (!user?.firstName) navigate("/");
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
  return (
    <div className="w-full p-8 grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3  gap-2">
      {applications.map((application) => (
        <div
          className="bg-stone-400 flex flex-col  justify-around min-h-[400px] p-4 rounded-xl"
          key={application._id}
        >
          <div className="p-2 mb-2 bg-stone-200 h-[100px] flex flex-col  justify-around font-[500] text-purple-600 ">
            <h1>Job Reference : {application.jobReference}</h1>
            <h1>Job Title : {application.jobTitle}</h1>
          </div>
          <p className="w-40 font-[500] px-2 mb-2 bg-stone-200 text-purple-600 ">
            Applicants :
          </p>
          <table className=" ">
            <thead>
              <tr className="">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {application.applicants.map((applicant, index) => (
                <tr key={index}>
                  <td>{applicant.firstName}</td>
                  <td>{applicant.lastName}</td>
                  <td>{applicant.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {isLoading && <Loading text={"loading..."} />}
    </div>
  );
};

export default Applications;
