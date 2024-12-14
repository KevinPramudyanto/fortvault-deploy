import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../context/user.tsx";
import { addWorker } from "../api/api.ts";

const AddWorker = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmRef = useRef<HTMLInputElement | null>(null);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const {
    mutate,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: addWorker,
    onSuccess: () => {
      navigate("/getworkers", { replace: true });
      userCtx?.setSnackbarMessage(
        `${usernameRef.current?.value} added to your store.`,
      );
      userCtx?.setSnackbarOpen(true);
    },
  });

  const handleAddWorker = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setError("");

    if (usernameRef.current && passwordRef.current && confirmRef.current) {
      if (
        usernameRef.current.value.length < 1 ||
        usernameRef.current.value.length > 20
      ) {
        setIsError(true);
        setError("Username must be between 1-20 characters.");
        return;
      }
      if (
        passwordRef.current.value.length < 1 ||
        passwordRef.current.value.length > 20
      ) {
        setIsError(true);
        setError("Password must be between 1-20 characters.");
        return;
      }
      if (confirmRef.current.value !== passwordRef.current.value) {
        setIsError(true);
        setError("Confirm Password do not match with Password.");
        return;
      }

      mutate({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">Add Worker</div>
      <form className="p-5 sm:p-10" onSubmit={handleAddWorker}>
        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="username">
            Username :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
            autoComplete="off"
            required
            maxLength={20}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="password">
            Password :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="password"
            type="password"
            placeholder="Password"
            ref={passwordRef}
            autoComplete="off"
            required
            maxLength={20}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="confirm">
            Confirm Password :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="confirm"
            type="password"
            placeholder="Confirm Password"
            ref={confirmRef}
            autoComplete="off"
            required
            maxLength={20}
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
          Add Worker
        </button>
      </form>

      {isError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {error}
        </div>
      )}
      {isRequestError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {requestError.message}
        </div>
      )}
    </div>
  );
};

export default AddWorker;
