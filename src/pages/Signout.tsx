import { useContext, useEffect } from "react";
import UserContext from "../context/user.tsx";

const Signout = () => {
  const userCtx = useContext(UserContext);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    userCtx?.setToken(null);
    userCtx?.setId(null);
    userCtx?.setUsername(null);
    userCtx?.setRole(null);
  }, []);

  return null;
};

export default Signout;
