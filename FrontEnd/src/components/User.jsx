import Job from "./Job";
import { AuthContext } from "./AuthProvider";
import { useContext, useState, useEffect } from "react";
import Loading from "./Loading";

import CustomSelect from "./CustomSelect";

const User = () => {
  const { setResponse, isLoading, setIsLoading, jobs, setJobs, serverDomain } =
    useContext(AuthContext);
  const [isCategory, setIsCategory] = useState(false);
  const [jobsToFilter, setJobsToFilter] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${serverDomain}/api/jobs`, {
          credentials: "include",
        });
        const data = await res.json();
        setIsLoading(false);
        if (res.status === 200) {
          setJobs(data);
          setJobsToFilter(data);
        } else {
          setResponse({ mesage: data.message });
        }
      } catch (error) {
        setResponse({ error: "please check your connection and try again" });
      }
    };
    fetchData();
  }, []);
  const handleClick = () => {
    setIsCategory(true);
  };
  return (
    <main className="w-full min-h-screen flex flex-col  items-center md:flex-row md:justify-around md:items-start p-4  ">
      <CustomSelect jobsToFilter={jobsToFilter} />

      <div className="p-4 2xl:w-[80%] xl:w-[70%] md:w-[65%] w-[90%]  bg-purple-200 bg-opacity-50 rounded-md border-[1px] border-stone-600 grid grid-cols-1   xl:grid-cols-2 gap-4  justify-items-center ">
        {jobs?.length != 0 ? (
          jobs.map((job, index) => <Job key={index} job={job} />)
        ) : (
          <p className="text-purple-700 font-[500] ">No job to display</p>
        )}
      </div>
      {isLoading && <Loading text={"Loading..."} />}
    </main>
  );
};

export default User;
