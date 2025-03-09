import { FaCheck } from "react-icons/fa";
const About = () => {
  return (
    <div className="w-full h-full p-4 flex flex-col justify-evenly items-center  ">
      <p className="bg-purple-300 text-purple-800 p-4 rounded-lg">
        Job hunting made simple ! Our platform helps you search , filter , and
        apply for jobs effortlessly. Keep track of your applications and get
        real-time status updates.
      </p>
      <div className="bg-purple-300 text-purple-800 p-4 rounded-lg">
        <h2 className="font-[500] mb-4 ">How it works</h2>
        <div className="p-container-about">
          <FaCheck />
          <p className="p-about">Search & filter jobs effortlessly.</p>
        </div>
        <div className="p-container-about">
          <FaCheck />
          <p className="p-about">Apply for jobs in one click.</p>
        </div>
        <div className="p-container-about">
          <FaCheck />
          <p className="p-about">Track application status in real time.</p>
        </div>
        <div className="p-container-about">
          <FaCheck />
          <p className="p-about">
            Get notified when your application is reviewed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
