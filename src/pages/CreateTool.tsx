import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import UserContext from "../context/user.tsx";
import { uploadTool, createTool } from "../api/api.ts";

const CreateTool = () => {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const brandRef = useRef<HTMLInputElement | null>(null);
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const {
    mutate: uploadMutate,
    isPending: isUploadPending,
    isError: isUploadError,
  } = useMutation({
    mutationFn: uploadTool,
    onSuccess: (data) => {
      handleCreateTool(data.public_id);
    },
  });

  const {
    mutate: createMutate,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useMutation({
    mutationFn: createTool,
    onSuccess: () => {
      navigate("/readtools", { replace: true });
      userCtx?.setSnackbarMessage("Tool added successfully");
      userCtx?.setSnackbarOpen(true);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setError("");

    if (!image) {
      setIsError(true);
      setError("Image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    uploadMutate(formData);
  };

  const handleCreateTool = (image: string) => {
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

      createMutate({
        name: nameRef.current.value,
        description: descriptionRef.current.value,
        brand: brandRef.current.value,
        image:
          "https://res.cloudinary.com/" +
          import.meta.env.VITE_CLOUDNAME +
          "/image/upload/" +
          image,
      });
    }
  };

  return (
    <div className="m-auto max-w-md">
      <div className="text-left text-2xl font-bold sm:text-3xl">Add Item</div>
      <form className="p-5 sm:p-10" onSubmit={handleUpload}>
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
            maxLength={50}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2">
          <div className="text-left font-semibold">Image :</div>
          <label
            className="overflow-hidden rounded border border-black p-2 focus:outline-black"
            htmlFor="image"
          >
            {!image ? (
              <div className="text-left text-neutral-500">Image</div>
            ) : (
              <div className="mb-2 text-left">{image?.name.slice(0, 15)}</div>
            )}
            <input
              className="hidden"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {preview && (
              <img
                className="aspect-video object-cover"
                src={preview}
                alt="preview"
              />
            )}
          </label>
        </div>

        <button
          disabled={isUploadPending || isCreatePending}
          className={
            isUploadPending || isCreatePending
              ? "submitting mt-3 rounded px-4 py-3 font-semibold text-white"
              : "mt-3 rounded bg-green-800 px-4 py-3 font-semibold text-white hover:bg-green-900"
          }
        >
          Add Item
        </button>
      </form>

      {isError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {error}
        </div>
      )}
      {isUploadError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          Failed to upload tool.
        </div>
      )}
      {isCreateError && (
        <div className="m-2 border border-red-600 p-2 font-bold text-red-600">
          {createError.message}
        </div>
      )}
    </div>
  );
};

export default CreateTool;
