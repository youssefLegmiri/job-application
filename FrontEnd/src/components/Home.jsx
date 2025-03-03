import Loading from "./Loading";
import { AuthContext } from "./AuthProvider";
import { useContext, useEffect, useState } from "react";
import useBreakPoint from "../CustomHook/useBreakPoint";
import image3 from "../assets/images/image3.jpg";
import image1 from "../assets/images/image1.jpg";
import image6 from "../assets/images/image6.jpg";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { isDelete } = useContext(AuthContext);
  const [position, setPosition] = useState(0);
  const isMd = useBreakPoint("(min-width:768px)");
  const arrayOfCards = [
    { id: 1, text: "Browse jobs", image: image1 },
    { id: 2, text: "Apply easily", image: image3 },
    { id: 3, text: "All in one place", image: image6 },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timer;
    if (index < 3) {
      timer = setTimeout(() => {
        setPosition(position + 512);
        setIndex(index + 1);
      }, 5000);
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
    <main
      className={` w-full min-h-screen mb-4 flex flex-col  p-2 bg-cover bg-no-repeat ${
        !isMd && "bg-center"
      }`}
      style={{
        backgroundImage: `url(${image3}) `,
      }}
    >
      <div className="  font-[500] rounded-lg flex flex-col justify-evenly items-center  w-full h-full  bg-opacity-50 text-white  bg-stone-500 ">
        <h1 className="text-6xl ">Find Your Next Opportunity Faster</h1>
        <div className="w-[70%] flex justify-between items-center  ">
          <FaArrowAltCircleLeft
            onClick={handleLeft}
            size={"50"}
            className="cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 "
          />
          <div className="flex flex-col rounded-lg items-center justify-evenly w-[80%] h-[500px] ">
            <div className="flex justify-around items-center overflow-hidden  w-[400px] rounded-lg ">
              {arrayOfCards.map((card) => (
                <div
                  key={card.id}
                  className={`relative mr-28 min-w-[400px] h-[400px] text-3xl  bg-purple-50 
                     p-4 rounded-lg flex flex-col items-center justify-around
                     transition-all duration-300 ease-in-out`}
                  style={{ left: ` -${position}px` }}
                >
                  <img
                    src={card.image}
                    className="w-[70%] rounded-lg "
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
          <FaArrowAltCircleRight
            onClick={handleRight}
            size={"50"}
            className="cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 "
          />
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
