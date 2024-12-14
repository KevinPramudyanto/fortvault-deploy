import { useContext } from "react";
import { Link } from "react-router-dom";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import styled from "@emotion/styled";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaCheck, FaShoppingCart, FaTimes } from "react-icons/fa";
import { TbShoppingCartOff } from "react-icons/tb";
import UserContext from "../../context/user.tsx";

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgb(20,83,45,0.9)",
    color: "white",
    fontSize: 14,
  },
}));

const ReadToolsCard = ({
  id,
  name,
  description,
  brand,
  image,
  worker,
  workerUsername,
  approved,
}: {
  id: string;
  name: string;
  description: string;
  brand: string;
  image: string;
  worker: string;
  workerUsername: string;
  approved: boolean;
}) => {
  const userCtx = useContext(UserContext);

  return (
    <div className="flex h-full flex-col break-words border border-green-900">
      <CustomTooltip
        title={description}
        slotProps={{
          popper: {
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [0, -150],
                },
              },
            ],
          },
        }}
      >
        <img
          className="aspect-video w-full border-b border-green-900 object-cover"
          src={image}
          alt={name}
        />
      </CustomTooltip>

      <div className="mx-5 my-1 text-xl font-bold" title={"Name : " + name}>
        {name}
      </div>
      <div
        className="mx-5 mb-1 text-lg font-semibold"
        title={"Brand : " + brand}
      >
        {brand}
      </div>

      <div className="mx-5 flex h-10 flex-col justify-center">
        <div>
          {approved && !worker
            ? "Available to borrow"
            : "Borrowed by " + workerUsername}
        </div>
        <div>{!approved && "(pending approval)"}</div>
      </div>

      {userCtx?.role === "manager" && approved && worker && (
        <div className="m-5 flex flex-wrap items-center justify-center gap-3">
          <div className="border border-green-200 px-2 py-1 font-semibold text-green-200">
            <div className="flex items-center justify-center gap-1">
              <MdEdit size={20} />
              <div>Update</div>
            </div>
          </div>
          <div className="border border-green-200 px-2 py-1 font-semibold text-green-200">
            <div className="flex items-center justify-center gap-1">
              <MdDelete size={20} />
              <div>Delete</div>
            </div>
          </div>
        </div>
      )}
      {userCtx?.role === "manager" && approved && !worker && (
        <div className="m-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
            to={"/updatetool/" + id}
          >
            <div className="flex items-center justify-center gap-1">
              <MdEdit size={20} />
              <div>Update</div>
            </div>
          </Link>
          <Link
            className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
            to={"/deletetool/" + id}
          >
            <div className="flex items-center justify-center gap-1">
              <MdDelete size={20} />
              <div>Delete</div>
            </div>
          </Link>
        </div>
      )}
      {userCtx?.role === "manager" && !approved && (
        <div className="m-5 flex flex-wrap items-center justify-center gap-3">
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
      )}

      {userCtx?.role === "worker" && worker && worker === userCtx?.id && (
        <div className="m-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
            to={"/removetool/" + id}
          >
            <div className="flex items-center justify-center gap-1">
              <TbShoppingCartOff size={20} />
              <div>Return</div>
            </div>
          </Link>
        </div>
      )}
      {userCtx?.role === "worker" && worker && worker !== userCtx?.id && (
        <div className="m-5 flex flex-wrap items-center justify-center gap-3">
          <div className="border border-green-200 px-2 py-1 font-semibold text-green-200">
            <div className="flex items-center justify-center gap-1">
              <FaShoppingCart size={20} />
              <div>Borrow</div>
            </div>
          </div>
        </div>
      )}
      {userCtx?.role === "worker" && !worker && (
        <div className="m-5 flex flex-wrap items-center justify-center gap-3">
          <Link
            className="border border-green-800 px-2 py-1 font-semibold text-green-800 hover:bg-green-900 hover:text-white"
            to={"/addtool/" + id}
          >
            <div className="flex items-center justify-center gap-1">
              <FaShoppingCart size={20} />
              <div>Borrow</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ReadToolsCard;
