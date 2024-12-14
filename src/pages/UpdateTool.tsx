import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserContext from "../context/user.tsx";
import { readTool, updateTool } from "../api/api.ts";

const UpdateTool = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const brandRef = useRef<HTMLInputElement | null>(null);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

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
    mutate,
    isPending: isRequestPending,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: (data: { name: string; description: string; brand: string }) =>
      updateTool(id || "", data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tool", id],
      });
      navigate("/readtools", { replace: true });
      userCtx?.setSnackbarMessage("Tool updated successfully");
      userCtx?.setSnackbarOpen(true);
    },
  });

  const handleUpdateTool = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setError("");

    if (nameRef.current && descriptionRef.current && brandRef.current) {
      if (
        nameRef.current.value.length < 1 ||
        nameRef.current.value.length > 50
      ) {
        setIsError(true);
        setError("Name must be between 1-50 characters.");
        return;
      }
      if (
        descriptionRef.current.value.length < 1 ||
        descriptionRef.current.value.length > 200
      ) {
        setIsError(true);
        setError("Description must be between 1-200 characters.");
        return;
      }
      if (
        brandRef.current.value.length < 1 ||
        brandRef.current.value.length > 50
      ) {
        setIsError(true);
        setError("Brand must be between 1-50 characters.");
        return;
      }

      mutate({
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        brand: brandRef.current.value,
      });
    }
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">
        Update Item
      </div>
      <form className="p-5 sm:p-10" onSubmit={handleUpdateTool}>
        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="name">
            Name :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="name"
            type="text"
            placeholder="Name"
            ref={nameRef}
            autoComplete="off"
            required
            defaultValue={tool.name}
            maxLength={50}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="description">
            Description :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="description"
            type="text"
            placeholder="Description"
            ref={descriptionRef}
            autoComplete="off"
            required
            defaultValue={tool.description}
            maxLength={200}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <label className="text-left font-semibold" htmlFor="brand">
            Brand :
          </label>
          <input
            className="rounded border border-black p-2 focus:outline-black"
            id="brand"
            type="text"
            placeholder="Brand"
            ref={brandRef}
            autoComplete="off"
            required
            defaultValue={tool.brand}
            maxLength={50}
          />
        </div>

        <button
          disabled={isReadPending || isRequestPending}
          className={
            isReadPending || isRequestPending
              ? "submitting mt-3 rounded px-4 py-3 font-semibold text-white"
              : "mt-3 rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
          }
        >
          Update Item
        </button>
      </form>

      {isError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {error}
        </div>
      )}
      {isReadError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {readError.message}
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

export default UpdateTool;
