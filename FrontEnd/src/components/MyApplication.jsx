import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
const MyApplication = () => {
  const { user, isLoading, setIsLoading, setResponse, serverDomain } =
    useContext(AuthContext);
  const [userApplications, setUserApplications] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${serverDomain}/api/application/userApplications`,
          {
            credentials: "include",
          }
        );
        const response = await res.json();
        if (res.status === 200) {
          setUserApplications(response);
          setIsLoading(false);
        } else {
          setResponse({ error: "Server error" });
        }
      } catch (error) {
        setResponse({ error: "Something went wrong" });
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-screen overflow-x-auto my-4 p-4 flex flex-col items-center ">
      {userApplications.length != 0 ? (
        <table className="table-styling w-[80%] min-w-[500px] overflow-x-auto ">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userApplications.map((application, index) => (
              <tr key={index}>
                <td>{application.jobTitle} </td>
                <td>{application.applicationStatus} </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-purple-700 font-[500] ">
          You have no applications yet
        </p>
      )}
      {isLoading && <Loading text={"loading..."} />}
    </div>
  );
};

export default MyApplication;
