import { Skeleton, useMediaQuery } from "@mui/material";

const GetNotificationsSkeleton = () => {
  const isAboveMd = useMediaQuery("(min-width:768px)");

  return (
    <Skeleton
      variant="rectangular"
      height={isAboveMd ? 75 : 120}
      className="overflow-hidden"
    />
  );
};

export default GetNotificationsSkeleton;
