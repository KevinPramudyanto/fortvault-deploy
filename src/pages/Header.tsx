import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PiToolboxBold } from "react-icons/pi";
import { GoPeople } from "react-icons/go";
import { MdNotificationsNone } from "react-icons/md";
import UserContext from "../context/user.tsx";
import { readTools } from "../api/api.ts";

const Header = () => {
  const userCtx = useContext(UserContext);

  const {
    data: tools = [],
    isPending,
    isError,
  } = useQuery({ queryKey: ["tools"], queryFn: readTools });

  return (
    <div className="fixed bottom-0 left-0 z-10 grid w-full grid-cols-3 gap-2 border-t bg-white px-5 py-3 text-sm font-bold sm:relative sm:z-auto sm:h-min sm:w-64 sm:flex-none sm:grid-cols-1 sm:gap-5 sm:border-0 sm:px-10 sm:text-xl">
      <NavLink
        to="/readtools"
        className={({ isActive }) =>
          isActive
            ? "rounded-lg bg-sky-100 text-blue-600"
            : "rounded-lg hover:bg-sky-100 hover:text-blue-600"
        }
      >
        <div className="flex flex-col items-center justify-center gap-0 px-4 py-2 sm:flex-row sm:gap-2">
          <div className="text-3xl">
            <PiToolboxBold />
          </div>
          <div>Items</div>
        </div>
      </NavLink>
      {userCtx?.role === "manager" && (
        <NavLink
          to="/getworkers"
          className={({ isActive }) =>
            isActive
              ? "rounded-lg bg-sky-100 text-blue-600"
              : "rounded-lg hover:bg-sky-100 hover:text-blue-600"
          }
        >
          <div className="flex flex-col items-center justify-center gap-0 px-4 py-2 sm:flex-row sm:gap-2">
            <div className="text-3xl">
              <GoPeople />
            </div>
            <div>Workers</div>
          </div>
        </NavLink>
      )}
      {userCtx?.role === "manager" && (
        <NavLink
          to="/getnotifications"
          className={({ isActive }) =>
            isActive
              ? "rounded-lg bg-sky-100 " +
                (!isPending &&
                !isError &&
                tools.filter((tool: { approved: boolean }) => !tool.approved)
                  .length > 0
                  ? "text-red-700"
                  : "text-blue-600")
              : "rounded-lg " +
                (!isPending &&
                !isError &&
                tools.filter((tool: { approved: boolean }) => !tool.approved)
                  .length > 0
                  ? "text-red-600 hover:text-red-700"
                  : "hover:text-blue-600") +
                " hover:bg-sky-100"
          }
        >
          <div className="relative flex flex-col items-center justify-center gap-0 px-4 py-2 sm:flex-row sm:gap-2">
            <div className="text-3xl">
              <div className="flex items-start justify-center">
                <MdNotificationsNone />
                <div className="absolute text-sm sm:hidden">
                  {"\u00A0".repeat(11)}(
                  {!isPending &&
                    !isError &&
                    tools.filter(
                      (tool: { approved: boolean }) => !tool.approved,
                    ).length}
                  {(isPending || isError) && "0"})
                </div>
              </div>
            </div>
            <div>
              Tasks{" "}
              <span className="hidden sm:inline">
                (
                {!isPending &&
                  !isError &&
                  tools.filter((tool: { approved: boolean }) => !tool.approved)
                    .length}
                {(isPending || isError) && "0"})
              </span>
            </div>
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default Header;
