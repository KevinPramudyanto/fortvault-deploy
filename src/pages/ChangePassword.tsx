import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../context/user.tsx";
import { changePassword } from "../api/api.ts";

const ChangePassword = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const oldPasswordRef = useRef<HTMLInputElement | null>(null);
  const newPasswordRef = useRef<HTMLInputElement | null>(null);
  const confirmRef = useRef<HTMLInputElement | null>(null);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const {
    mutate,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      navigate("/", { replace: true });
      userCtx?.setSnackbarMessage("Your password has been changed");
      userCtx?.setSnackbarOpen(true);
    },
  });

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setError("");

    if (
      oldPasswordRef.current &&
      newPasswordRef.current &&
      confirmRef.current
    ) {
      if (
        oldPasswordRef.current.value.length < 1 ||
        oldPasswordRef.current.value.length > 20
      ) {
        setIsError(true);
        setError("Password must be between 1-20 characters.");
        return;
      }
      if (
        newPasswordRef.current.value.length < 1 ||
        newPasswordRef.current.value.length > 20
      ) {
        setIsError(true);
        setError("Password must be between 1-20 characters.");
        return;
      }
      if (confirmRef.current.value !== newPasswordRef.current.value) {
        setIsError(true);
        setError("Confirm Password do not match with Password.");
        return;
      }

      mutate({
        oldPassword: oldPasswordRef.current.value,
        newPassword: newPasswordRef.current.value,
      });
    }
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">
        Change Password
      </div>
      <form className="p-5 sm:p-10" onSubmit={handleChangePassword}>
        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="oldpassword">
            Current password :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="oldpassword"
            type="password"
            placeholder="Current password"
            ref={oldPasswordRef}
            autoComplete="off"
            required
            maxLength={20}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="newpassword">
            New password :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="newpassword"
            type="password"
            placeholder="New password"
            ref={newPasswordRef}
            autoComplete="off"
            required
            maxLength={20}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="confirm">
            Confirm password :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="confirm"
            type="password"
            placeholder="Confirm password"
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
          Change Password
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

export default ChangePassword;
