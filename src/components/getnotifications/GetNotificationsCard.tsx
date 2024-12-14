import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

const GetNotificationsCard = ({
  id,
  name,
  brand,
  workerUsername,
}: {
  id: string;
  name: string;
  brand: string;
  workerUsername: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-5 overflow-hidden bg-green-50 p-5 md:flex-row">
      <div className="font-medium">
        {workerUsername} has requested to borrow your {brand} {name}.
      </div>
      <div className="flex items-center justify-center gap-3">
        <Link
          className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
          to={"/approvetool/" + id}
        >
          <div className="flex items-center justify-center gap-1">
            <FaCheck size={20} />
            <div>Approve</div>
          </div>
        </Link>
        <Link
          className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
          to={"/rejecttool/" + id}
        >
          <div className="flex items-center justify-center gap-1">
            <FaTimes size={20} />
            <div>Reject</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GetNotificationsCard;
