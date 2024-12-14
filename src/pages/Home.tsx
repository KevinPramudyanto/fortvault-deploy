import { Link } from "react-router-dom";
import { SiStartrek } from "react-icons/si";

const Home = () => {
  return (
    <>
      <div className="mb-20 mt-14 flex flex-col">
        <div className="text-2xl font-bold sm:text-3xl">
          Seamless inventory management for your business
        </div>
        <div className="mb-5 sm:text-lg">
          Keep track of your physical material, tool, and equipment
        </div>
        <Link
          to="/signup"
          className="m-auto rounded-full bg-green-800 px-6 py-3 font-bold text-white hover:bg-green-900"
        >
          <div className="flex items-center justify-center gap-3">
            <SiStartrek size={30} />
            <div>Get started for free</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
