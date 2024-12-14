import { useContext, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../context/user.tsx";
import { removeWorker } from "../api/api.ts";

const RemoveWorker = () => {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const username = location.state;

  const {
    mutate,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: removeWorker,
    onSuccess: () => {
      navigate("/getworkers", { replace: true });
      userCtx?.setSnackbarMessage(
        `${usernameRef.current?.value} removed from your store.`,
      );
      userCtx?.setSnackbarOpen(true);
    },
  });

  const handleRemoveWorker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(id || "");
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">
        Remove Worker
      </div>
      <form className="p-5 sm:p-10" onSubmit={handleRemoveWorker}>
        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="username">
            Username :
          </label>
          <input
            className="cursor-not-allowed rounded border border-neutral-600 bg-neutral-200 p-2 text-neutral-600"
            id="username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            autoComplete="off"
            disabled
            defaultValue={username}
          />
        </div>

        <button
          disabled={isRequestPending}
          className={
            isRequestPending
              ? "submitting mt-3 rounded px-4 py-3 font-semibold text-white"
              : "mt-3 rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
          }
        >
          Remove this worker ?
        </button>
      </form>

      {isRequestError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {requestError.message}
        </div>
      )}
    </div>
  );
};

export default RemoveWorker;
