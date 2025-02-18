import { IoIosArrowDown } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { FaArrowAltCircleRight } from "react-icons/fa";
const CustomSelect = ({ jobsToFilter }) => {
  const [option, setOption] = useState("All");
  const { setJobs } = useContext(AuthContext);

  useEffect(() => {
    if (option === "All") {
      setJobs(jobsToFilter);
    } else {
      const filteredJobs = jobsToFilter.filter(
        (job) => job.category === option.toLowerCase()
      );
      setJobs(filteredJobs);
    }
  }, [option]);

  const handleOption = (e) => {
    setOption(e.target.textContent);
  };
  return (
    <main
      className="2xl:w-[15%] xl:w-[20%] md:w-[28%]  w-[30%]  h-[50%] text-xl
     bg-stone-100  text-stone-600 border-[1px] border-stone-600 font-[500] 
     flex flex-col items-center  justify-evenly  rounded-lg "
    >
      <div className="bg-stone-300 w-[80%] p-2 text-center ">Category</div>
      <div
        onClick={handleOption}
        className={`${
          (option === "All" || !option) && "bg-stone-300"
        } category`}
      >
        {(option === "All" || !option) && (
          <FaArrowAltCircleRight className="absolute left-1" />
        )}
        All
      </div>
      <div
        onClick={handleOption}
        className={`${option === "Managment" && "bg-stone-300"} category`}
      >
        {option === "Managment" && (
          <FaArrowAltCircleRight className="absolute left-1" />
        )}
        Managment
      </div>
      <div
        onClick={handleOption}
        className={`${option === "Electric" && "bg-stone-300"} category`}
      >
        {option === "Electric" && (
          <FaArrowAltCircleRight className="absolute left-1" />
        )}
        Electric
      </div>
      <div
        onClick={handleOption}
        className={`${option === "IT" && "bg-stone-300"} category`}
      >
        {option === "IT" && (
          <FaArrowAltCircleRight className="absolute left-1" />
        )}
        IT
      </div>
      <div
        onClick={handleOption}
        className={`${option === "Process" && "bg-stone-300"} category`}
      >
        {option === "Process" && (
          <FaArrowAltCircleRight className="absolute left-1" />
        )}
        Process
      </div>
    </main>
  );
};

export default CustomSelect;
