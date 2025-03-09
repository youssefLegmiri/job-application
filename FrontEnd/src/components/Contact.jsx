import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import Input from "./Input";
const Contact = () => {
  return (
    <div className="md:w-[50%] w-[80%] min-h-[500px] rounded-md bg-purple-500 p-4 flex flex-col  justify-around items-center ">
      <div className="bg-purple-200 p-4 rounded-md">
        <h2 className=" text-purple-700 font-[500] mb-2">Get in Touch</h2>
        <p className="text-purple-800">
          Have questions, feedback, or need support ? We are here to help !
        </p>
      </div>
      <div className="bg-purple-200 p-4 rounded-md font-[500] ">
        <div className="flex items-center  ">
          <MdOutlineEmail size={"30"} className="text-purple-800" />
          <a
            href="mailto:youssef.legmiri@gmail.com"
            className="text-purple-700 ml-4 "
          >
            youssef.legmiri@gmail.com
          </a>
        </div>
        <div className="flex items-center p-2 ">
          <FaWhatsapp size={"30"} className="text-purple-800" />
          <a
            className="text-purple-700 ml-4 "
            href="https://wa.me/+212654363513"
          >
            +212654363513
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
