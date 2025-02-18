import Job from "./Job";
import { AuthContext } from "./AuthProvider";
import { useContext, useState, useEffect } from "react";
import Loading from "./Loading";
import { IoIosArrowForward } from "react-icons/io";
import CustomSelect from "./CustomSelect";
import useBreakPoint from "../CustomHook/useBreakPoint";
const User = () => {
  const { setResponse, isLoading, setIsLoading, jobs, setJobs } =
    useContext(AuthContext);
  const [isCategory, setIsCategory] = useState(false);
  const [jobsToFilter, setJobsToFilter] = useState([]);
  const isMd = useBreakPoint("(min-width:768px)");
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
          setJobsToFilter(data);
        } else {
          setResponse({ mesage: data.message });
        }
      } catch (error) {
        setResponse({ error: error.message });
      }
    };
    fetchData();
  }, []);
  const handleClick = () => {
    setIsCategory(true);
  };
  return (
    <main className="w-full min-h-screen flex justify-around p-4  ">
      {isMd ? (
        <CustomSelect jobsToFilter={jobsToFilter} />
      ) : (
        <div
          onClick={handleClick}
          className="fixed top-[400px] left-0 z-20 flex flex-col items-center text-sm bg-stone-600 text-stone-200 text-center p-2  rounded-md cursor-pointer"
        >
          <IoIosArrowForward size={"30"} />
          Category
        </div>
      )}

      <div className="p-8 2xl:w-[80%] xl:w-[70%] md:w-[65%] w-[90%]  bg-stone-300 rounded-md border-[1px] border-stone-600 grid grid-cols-1   xl:grid-cols-2 gap-4  justify-items-center ">
        {jobs?.length != 0 ? (
          jobs.map((job, index) => <Job key={index} job={job} />)
        ) : (
          <p className="text-stone-600 font-[500] ">No job to display</p>
        )}
      </div>
      {isLoading && <Loading text={"Loading..."} />}
    </main>
  );
};

export default User;
