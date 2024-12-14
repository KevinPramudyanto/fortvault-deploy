import { useContext, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import UserContext from "../context/user.tsx";
import { readTool, getWorkers, rejectTool } from "../api/api.ts";

const RejectTool = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const brandRef = useRef<HTMLInputElement | null>(null);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: tool = {},
    isPending: isReadPending,
    isError: isReadError,
    error: readError,
  } = useQuery({
    queryKey: ["tool", id],
    queryFn: () => readTool(id || ""),
  });

  const {
    data: workers = [],
    isPending: isWorkersReadPending,
    isError: isWorkersReadError,
    error: workersReadError,
  } = useQuery({ queryKey: ["workers"], queryFn: getWorkers });

  const {
    mutate,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: rejectTool,
    onSuccess: () => {
      navigate("/", { replace: true });
      userCtx?.setSnackbarMessage("Tool request is rejected.");
      userCtx?.setSnackbarOpen(true);
    },
  });

  const handleRejectTool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(id || "");
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">
        Reject Item
      </div>
      <form className="p-5 sm:p-10" onSubmit={handleRejectTool}>
        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="name">
            Name :
          </label>
          <input
            className="cursor-not-allowed rounded border border-neutral-600 bg-neutral-200 p-2 text-neutral-600"
            id="name"
            type="text"
            placeholder="Name"
            ref={nameRef}
            autoComplete="off"
            disabled
            defaultValue={tool.name}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="description">
            Description :
          </label>
          <input
            className="cursor-not-allowed rounded border border-neutral-600 bg-neutral-200 p-2 text-neutral-600"
            id="description"
            type="text"
            placeholder="Description"
            ref={descriptionRef}
            autoComplete="off"
            disabled
            defaultValue={tool.description}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="brand">
            Brand :
          </label>
          <input
            className="cursor-not-allowed rounded border border-neutral-600 bg-neutral-200 p-2 text-neutral-600"
            id="brand"
            type="text"
            placeholder="Brand"
            ref={brandRef}
            autoComplete="off"
            disabled
            defaultValue={tool.brand}
          />
        </div>

        <button
          disabled={isReadPending || isWorkersReadPending || isRequestPending}
          className={
            isReadPending || isWorkersReadPending || isRequestPending
              ? "submitting mt-3 rounded px-4 py-3 font-semibold text-white"
              : "mt-3 rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
          }
        >
          Reject{" "}
          {!isWorkersReadPending &&
            !isWorkersReadError &&
            workers.find((worker: { id: string }) => tool.worker === worker.id)
              ?.username}{" "}
          to borrow this item ?
        </button>
      </form>

      {isReadError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {readError.message}
        </div>
      )}
      {isWorkersReadError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {workersReadError.message}
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

export default RejectTool;