import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    // To Center Loader Use This Css Styles
    <div
      className="
      h-[70vh]
      flex 
      flex-col 
      justify-center 
      items-center 
    "
    >
      <ScaleLoader size={100} color="red" />
    </div>
  );
};

export default Loader;
