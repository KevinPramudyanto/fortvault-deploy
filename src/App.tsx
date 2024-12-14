import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Snackbar, SnackbarContent } from "@mui/material";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import CreateTool from "./pages/CreateTool";
import UpdateTool from "./pages/UpdateTool";
import DeleteTool from "./pages/DeleteTool";
import ApproveTool from "./pages/ApproveTool";
import RejectTool from "./pages/RejectTool";
import AddWorker from "./pages/AddWorker";
import GetWorkers from "./pages/GetWorkers";
import RemoveWorker from "./pages/RemoveWorker";
import ReadTools from "./pages/ReadTools";
import AddTool from "./pages/AddTool";
import RemoveTool from "./pages/RemoveTool";
import GetNotifications from "./pages/GetNotifications";
import Statistics from "./pages/Statistics";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";
import Header from "./pages/Header";
import UserContext from "./context/user.tsx";

const queryClient = new QueryClient();

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [id, setId] = useState<string | null>(localStorage.getItem("id"));
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username"),
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    document.title = snackbarMessage === "" ? "FortVault" : snackbarMessage;

    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    link.href = snackbarMessage === "" ? "./safe.png" : "./check.png";
  }, [snackbarMessage]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          token,
          setToken,
          id,
          setId,
          username,
          setUsername,
          role,
          setRole,
          setSnackbarOpen,
          setSnackbarMessage,
        }}
      >
        <Navbar />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => {
            setSnackbarOpen(false);
            setSnackbarMessage("");
          }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <SnackbarContent
            message={snackbarMessage}
            sx={{
              backgroundColor: "darkgreen",
              fontSize: "16px",
            }}
          />
        </Snackbar>

        <div className="mx-auto flex max-w-screen-xl">
          {token && (role === "manager" || role === "worker") && <Header />}
          <div className="mx-auto w-full max-w-screen-xl px-5 sm:px-10">
            <Routes>
              {token && role === "manager" ? (
                <>
                  <Route
                    path="/"
                    element={<Navigate replace to="/readtools" />}
                  />
                  <Route path="/createtool" element={<CreateTool />}></Route>
                  <Route path="/readtools" element={<ReadTools />}></Route>
                  <Route
                    path="/updatetool/:id"
                    element={<UpdateTool />}
                  ></Route>
                  <Route
                    path="/deletetool/:id"
                    element={<DeleteTool />}
                  ></Route>
                  <Route
                    path="/approvetool/:id"
                    element={<ApproveTool />}
                  ></Route>
                  <Route
                    path="/rejecttool/:id"
                    element={<RejectTool />}
                  ></Route>
                  <Route path="/addworker" element={<AddWorker />}></Route>
                  <Route path="/getworkers" element={<GetWorkers />}></Route>
                  <Route
                    path="/removeworker/:id"
                    element={<RemoveWorker />}
                  ></Route>
                  <Route
                    path="/getnotifications"
                    element={<GetNotifications />}
                  ></Route>
                  <Route path="/statistics" element={<Statistics />}></Route>
                  <Route path="/account" element={<ChangePassword />}></Route>
                  <Route path="/signout" element={<Signout />}></Route>
                </>
              ) : token && role === "worker" ? (
                <>
                  <Route
                    path="/"
                    element={<Navigate replace to="/readtools" />}
                  />
                  <Route path="/readtools" element={<ReadTools />}></Route>
                  <Route path="/addtool/:id" element={<AddTool />}></Route>
                  <Route
                    path="/removetool/:id"
                    element={<RemoveTool />}
                  ></Route>
                  <Route path="/account" element={<ChangePassword />}></Route>
                  <Route path="/signout" element={<Signout />}></Route>
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />}></Route>
                  <Route path="/signin" element={<Signin />}></Route>
                  <Route
                    path="/signout"
                    element={<Navigate replace to="/" />}
                  ></Route>
                </>
              )}
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        </div>

        {token && (role === "manager" || role === "worker") && (
          <div className="p-9 text-white sm:p-0">Footer</div>
        )}
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
