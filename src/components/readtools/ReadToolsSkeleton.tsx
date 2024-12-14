import { Skeleton } from "@mui/material";

const ReadToolsSkeleton = () => {
  return (
    <div className="overflow-hidden border border-green-900">
      <Skeleton
        variant="rectangular"
        className="border-b border-green-900 pt-[56.25%]"
      />

      <Skeleton variant="rectangular" height={28} className="mx-10 my-1" />

      <Skeleton variant="rectangular" height={28} className="mx-16 mb-1" />

      <Skeleton variant="rectangular" height={40} className="mx-10 mb-1" />

      <Skeleton variant="rectangular" height={28} className="m-5" />
    </div>
  );
};

export default ReadToolsSkeleton;
