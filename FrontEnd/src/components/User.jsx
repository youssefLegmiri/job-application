import Job from "./Job";
import { AuthContext } from "./AuthProvider";
import { useContext, useState, useEffect } from "react";
import Loading from "./Loading";

const User = () => {
  const { jobs, setJobs, setResponse } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
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
  return (
    <>
      <div className="p-8 w-[100%] grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4 justify-items-center ">
        {jobs.length != 0
          ? jobs.map((job, index) => <Job key={index} job={job} />)
          : "No job to display"}
      </div>
      {isLoading && <Loading text={"Loading..."} />}
    </>
  );
};

export default User;
