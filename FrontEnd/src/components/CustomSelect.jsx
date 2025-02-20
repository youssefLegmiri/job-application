import { FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { FaArrowAltCircleRight } from "react-icons/fa";
import useBreakPoint from "../CustomHook/useBreakPoint";
const CustomSelect = ({ jobsToFilter }) => {
  const [option, setOption] = useState("All");
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");
  const { setJobs } = useContext(AuthContext);
  const isMd = useBreakPoint("(min-width:768px)");
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
  const handleChange = (e) => {
    setSearch(e.target.value);
    e.target.value === "" ? setIsSearch(false) : setIsSearch(true);
  };
  const handleClick = () => {
    setSearch("");
    setIsSearch(false);
  };
  const handleKeyDown = (e) => {
    setOption("None");
    const searchedJobs = jobsToFilter.filter((item) =>
      item.title.toLowerCase().includes(search)
    );
    setJobs(searchedJobs);
    if (e.key === "Enter") {
      setIsSearch(false);
      setSearch("");
    }
  };
  return (
    <main
      className="2xl:w-[15%] xl:w-[20%] md:w-[28%] md:p-0 p-2 mb-4  w-[90%] h-[150px]  md:h-[400px] text-xl
     bg-stone-100  text-purple-700 border-[1px] border-stone-600 font-[500] 
     flex flex-col items-center  justify-evenly  rounded-lg overflow-x-auto "
    >
      <div className="relative font-[500] w-[80%]  flex items-center justify-center ">
        <input
          autoFocus
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={search}
          className="w-[100%] focus:outline-none  p-2 text-xl text-purple-700 bg-purple-50  border-[1px] border-stone-600 rounded-lg "
          type="text"
          placeholder="Search job"
        />
        {isSearch && (
          <FaTimes
            onClick={handleClick}
            size={"25"}
            className="absolute top-3 right-2 rounded-full bg-purple-300 p-[3px] cursor-pointer"
          />
        )}
      </div>
      {isMd && (
        <div className="md:bg-purple-300 w-[80%] p-2 rounded-lg text-center ">
          Category
        </div>
      )}
      <div className="w-full flex md:flex-col items-center justify-around md:h-[70%]  ">
        <div
          onClick={handleOption}
          className={`${
            (option === "All" || !option) && "bg-purple-300"
          } category`}
        >
          {(option === "All" || !option) && isMd && (
            <FaArrowAltCircleRight className="absolute left-1" />
          )}
          All
        </div>
        <div
          onClick={handleOption}
          className={`${option === "Managment" && "bg-purple-300"} category`}
        >
          {option === "Managment" && isMd && (
            <FaArrowAltCircleRight className="absolute left-1" />
          )}
          Managment
        </div>
        <div
          onClick={handleOption}
          className={`${option === "Electric" && "bg-purple-300"} category`}
        >
          {option === "Electric" && isMd && (
            <FaArrowAltCircleRight className="absolute left-1" />
          )}
          Electric
        </div>
        <div
          onClick={handleOption}
          className={`${option === "IT" && "bg-purple-300"} category`}
        >
          {option === "IT" && isMd && (
            <FaArrowAltCircleRight className="absolute left-1" />
          )}
          IT
        </div>
        <div
          onClick={handleOption}
          className={`${option === "Process" && "bg-purple-300"} category`}
        >
          {option === "Process" && isMd && (
            <FaArrowAltCircleRight className="absolute left-1" />
          )}
          Process
        </div>
      </div>
    </main>
  );
};

export default CustomSelect;
