import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const GetWorkersCard = ({ id, username }: { id: string; username: string }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-1 overflow-hidden rounded-full bg-green-50 p-5 md:flex-row">
      <img
        className="w-10"
        src={`https://robohash.org/${username}.png?set=set5`}
        alt={username}
        title={username}
      />
      <div className="font-medium">{username}</div>
      <Link
        className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
        to={"/removeworker/" + id}
        state={username}
      >
        <div className="flex items-center justify-center gap-1">
          <MdDelete size={20} />
          <div>Remove</div>
        </div>
      </Link>
    </div>
  );
};

export default GetWorkersCard;
