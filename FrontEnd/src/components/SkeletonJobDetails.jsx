const SkeletonJobDetails = () => {
  return (
    <div
      className=" relative p-4 mb-10 w-[80%] min-h-[600px] rounded-xl 
          shadow-custom-shadow bg-purple-50  flex flex-col md:items-center
            justify-evenly"
    >
      <div className="absolute top-4 left-4 w-10 h-10 bg-purple-600 rounded-full animate-pulse "></div>
      <h1 className="SkeletonJobItems "></h1>
      <h1 className="SkeletonJobItems "></h1>
      <h1 className="SkeletonJobItems "></h1>
      <h1 className="SkeletonJobItems "></h1>

      <button className="absolute bottom-2 right-4 bg-purple-700 w-24 h-10 rounded-xl animate-pulse"></button>
    </div>
  );
};

export default SkeletonJobDetails;
