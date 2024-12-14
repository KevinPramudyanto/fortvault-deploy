import { Skeleton, useMediaQuery } from "@mui/material";

const GetWorkersSkeleton = () => {
  const isAboveMd = useMediaQuery("(min-width:768px)");

  return (
    <Skeleton
      variant="rectangular"
      height={isAboveMd ? 80 : 145}
      className="overflow-hidden rounded-full"
    />
  );
};

export default GetWorkersSkeleton;
