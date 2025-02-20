import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Loading from "./Loading";
const MyApplication = () => {
  const { user, isLoading, setIsLoading } = useContext(AuthContext);
  const [userApplications, setUserApplications] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/application/userApplications",
          {
            credentials: "include",
          }
        );
        const response = await res.json();
        setIsLoading(false);
        setUserApplications(response);
        if (res.status === 200) {
          console.log(response);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-screen overflow-x-auto my-4 p-4  bg-stone-300  flex flex-col items-center ">
      <table className="w-[90%] ">
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
      {isLoading && <Loading text={"loading..."} />}
    </div>
  );
};

export default MyApplication;
