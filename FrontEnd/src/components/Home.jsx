import Loading from "./Loading";
import { AuthContext } from "./AuthProvider";
import { useContext, useEffect, useState } from "react";
import useBreakPoint from "../CustomHook/useBreakPoint";
import image3 from "../assets/images/image3.jpg";
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image4 from "../assets/images/image4.jpg";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { isDelete } = useContext(AuthContext);
  const [position, setPosition] = useState(0);
  const isMd = useBreakPoint("(min-width:540px)");
  const arrayOfCards = [
    { id: 1, text: "Browse jobs", image: image2 },
    { id: 2, text: "Apply easily", image: image4 },
    { id: 3, text: "All in one place", image: image1 },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (index < 3) {
      timer = setTimeout(() => {
        setPosition(position + 512);
        setIndex(index + 1);
      }, 3000);
    } else {
      setIndex(0);
      setPosition(0);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [position, index]);

  const handleLeft = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      setPosition(position - 512);
    }
  };
  const handleRight = () => {
    if (index < 2) {
      setIndex((prev) => prev + 1);
      setPosition(position + 512);
    }
  };
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <main className={` w-full   p-4 flex flex-col`}>
      <div className=" p-4 font-[500] rounded-lg flex flex-col justify-evenly items-center  w-full h-full  bg-opacity-50 text-white  bg-purple-600 ">
        <h1 className="text-6xl ">Find Your Next Opportunity Faster.</h1>
        <div className="w-[90%] md:w-[70%] flex justify-between items-center  ">
          <div
            onClick={handleLeft}
            className={`z-10  ${
              isMd ? "text-purple-50" : "text-purple-600"
            }  cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 `}
          >
            {isMd ? (
              <FaArrowAltCircleLeft size={"50"} />
            ) : (
              <IoIosArrowBack size={"50"} />
            )}
          </div>
          <div className="flex flex-col rounded-lg items-center justify-evenly w-[80%] h-[500px] ">
            <div className="flex justify-around items-center overflow-hidden  w-[400px] rounded-lg ">
              {arrayOfCards.map((card) => (
                <div
                  key={card.id}
                  className={`relative mr-28 min-w-[400px] h-[400px] text-3xl  bg-purple-100 
                     p-4 rounded-lg flex flex-col items-center justify-around
                     transition-all duration-500 ease-in-out`}
                  style={{ left: ` -${position}px` }}
                >
                  <img
                    src={card.image}
                    className="w-[90%] rounded-lg "
                    alt=""
                  />
                  <h1 className="bg-purple-600 p-2 rounded-lg ">{card.text}</h1>
                </div>
              ))}
            </div>
            <div className="lg:w-[30%] w-[40%] flex justify-between">
              <div className="w-6 h-6 rounded-full bg-purple-50 flex justify-center items-center">
                {index === 0 && (
                  <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                )}
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-50 flex justify-center items-center">
                {index === 1 && (
                  <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                )}
              </div>
              <div className="w-6 h-6 rounded-full bg-purple-50 flex justify-center items-center">
                {index === 2 && (
                  <div className="w-4 h-4 rounded-full bg-purple-600"></div>
                )}
              </div>
            </div>
          </div>
          <div
            onClick={handleRight}
            className={`z-10  ${
              isMd ? "text-purple-50" : "text-purple-600"
            }  cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 `}
          >
            {isMd ? (
              <FaArrowAltCircleRight size={"50"} />
            ) : (
              <IoIosArrowForward size={"50"} />
            )}
          </div>
        </div>
        <div className="w-[80%] h-[150px]">
          <button onClick={handleClick} className="btn-custom ">
            Browse Jobs
          </button>
        </div>
      </div>
      {isDelete && <Loading />}
    </main>
  );
};

export default Home;
