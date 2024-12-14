import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { IoSettingsOutline } from "react-icons/io5";
import {
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlinePresentationChartLine,
} from "react-icons/hi";
import NavbarLogo from "../components/navbar/NavbarLogo";
import UserContext from "../context/user.tsx";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    const restrictedValue = Math.floor((value / 255) * 111);
    color += `00${restrictedValue.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.toUpperCase()?.[0] || ""}${name.toUpperCase()?.[1] || ""}`,
  };
}

const Navbar = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const userCtx = useContext(UserContext);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollY && currentScrollY > 200) {
        setShowMenu(false);
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <>
      <div
        className={`fixed z-10 w-full border-b bg-neutral-100 duration-500 ${showNavbar ? "top-0" : "top-[-100px]"}`}
      >
        <div className="m-auto flex max-w-screen-xl items-center justify-between gap-3 px-5 py-3">
          <Link to="/" title="FortVault Home">
            <NavbarLogo />
          </Link>

          {userCtx?.token ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu((prevShowMenu) => !prevShowMenu)}
              >
                <Avatar {...stringAvatar(userCtx?.username || "")} />
              </button>

              <div
                className={`absolute right-0 z-10 mt-1 ${showMenu ? "" : "hidden"} w-40 rounded bg-white p-2 shadow-2xl shadow-neutral-500`}
              >
                {userCtx?.role === "manager" && (
                  <Link
                    to="/statistics"
                    onClick={() => setShowMenu(false)}
                    className="block rounded px-3 py-1 font-bold hover:bg-sky-100 hover:text-blue-800"
                  >
                    <div className="flex items-center justify-start gap-3">
                      <HiOutlinePresentationChartLine size={30} />
                      <div className="text-sm sm:text-base">Statistics</div>
                    </div>
                  </Link>
                )}
                <Link
                  to="/account"
                  onClick={() => setShowMenu(false)}
                  className="mt-2 block rounded px-3 py-1 font-bold hover:bg-sky-100 hover:text-blue-800"
                >
                  <div className="flex items-center justify-start gap-3">
                    <IoSettingsOutline size={30} />
                    <div className="text-sm sm:text-base">Settings</div>
                  </div>
                </Link>
                <Link
                  to="/signout"
                  onClick={() => setShowMenu(false)}
                  className="mt-2 block rounded px-3 py-1 font-bold hover:bg-sky-100 hover:text-blue-800"
                >
                  <div className="flex items-center justify-start gap-3">
                    <HiOutlineLogout size={30} />
                    <div className="text-sm sm:text-base">Sign Out</div>
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            <Link
              to="/signin"
              className="px-3 py-1 font-bold text-green-800 hover:rounded hover:bg-green-900 hover:text-white"
            >
              <div className="flex items-center justify-center gap-1">
                <HiOutlineLogin size={30} />
                <div className="text-sm sm:text-base">Sign In</div>
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="p-6 text-white">Navbar</div>
    </>
  );
};

export default Navbar;
