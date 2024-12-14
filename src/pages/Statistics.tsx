import { useQuery } from "@tanstack/react-query";
import { Skeleton, useMediaQuery } from "@mui/material";
import { FaMagnifyingGlassChart } from "react-icons/fa6";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toolsByWorker, toolsByTime } from "../api/api.ts";

const Statistics = () => {
  const isAboveLg = useMediaQuery("(min-width:1024px)");
  const isAboveMd = useMediaQuery("(min-width:768px)");

  const {
    data: toolsWorker,
    isPending: isPendingToolsWorker,
    isError: isErrorToolsWorker,
    error: errorToolsWorker,
  } = useQuery({
    queryKey: ["toolsByWorker"],
    queryFn: toolsByWorker,
  });

  const {
    data: toolsTime,
    isPending: isPendingToolsTime,
    isError: isErrorToolsTime,
    error: errorToolsTime,
  } = useQuery({
    queryKey: ["toolsByTime"],
    queryFn: toolsByTime,
  });

  return (
    <div className="m-auto">
      <div className="my-5">
        <div className="mx-auto mb-2 text-left text-xl font-bold sm:text-2xl">
          Tool Usage By Worker
        </div>

        {isErrorToolsWorker && (
          <div className="m-auto max-w-md border border-red-600 p-2 font-bold text-red-600">
            Error: {errorToolsWorker.message}
          </div>
        )}

        {isPendingToolsWorker && (
          <Skeleton
            variant="rectangular"
            height={300}
            className="m-auto overflow-hidden"
          />
        )}

        {!isPendingToolsWorker &&
          !isErrorToolsWorker &&
          toolsWorker.length === 0 && (
            <div className="mx-auto flex max-w-md flex-col items-center justify-center text-blue-600">
              <FaMagnifyingGlassChart size={80} />
              <div className="text-2xl font-semibold">No data yet</div>
            </div>
          )}

        {!isPendingToolsWorker &&
          !isErrorToolsWorker &&
          toolsWorker.length > 0 && (
            <div className="mx-auto flex max-w-screen-md items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={
                    isAboveMd
                      ? isAboveLg
                        ? toolsWorker.slice(0, 8)
                        : toolsWorker.slice(0, 5)
                      : toolsWorker.slice(0, 3)
                  }
                  margin={{ right: 40, bottom: 20 }}
                >
                  <XAxis
                    dataKey="worker_username"
                    tick={{ stroke: "black", fontSize: 14 }}
                    interval={0}
                    angle={-20}
                    dy={10}
                  />
                  <YAxis tick={{ stroke: "black", fontSize: 14 }} />
                  <Tooltip />
                  <Bar
                    dataKey="last_month"
                    stackId="a"
                    barSize={50}
                    fill="#2563eb"
                  />
                  <Bar
                    dataKey="two_months_ago"
                    stackId="a"
                    barSize={50}
                    fill="#166534"
                  />
                  <Bar
                    dataKey="three_months_ago"
                    stackId="a"
                    barSize={50}
                    fill="#dc2626"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
      </div>

      <div className="my-5">
        <div className="mx-auto mb-2 text-left text-xl font-bold sm:text-2xl">
          Tool Usage By Month
        </div>

        {isErrorToolsTime && (
          <div className="m-auto max-w-md border border-red-600 p-2 font-bold text-red-600">
            Error: {errorToolsTime.message}
          </div>
        )}

        {isPendingToolsTime && (
          <Skeleton
            variant="rectangular"
            height={300}
            className="m-auto overflow-hidden"
          />
        )}

        {!isPendingToolsTime && !isErrorToolsTime && toolsTime.length === 0 && (
          <div className="mx-auto flex max-w-md flex-col items-center justify-center text-blue-600">
            <FaMagnifyingGlassChart size={80} />
            <div className="text-2xl font-semibold">No data yet</div>
          </div>
        )}

        {!isPendingToolsTime && !isErrorToolsTime && toolsTime.length > 0 && (
          <div className="mx-auto flex max-w-screen-md items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={toolsTime} margin={{ right: 40, bottom: 20 }}>
                <XAxis
                  dataKey="borrow_month"
                  tick={{ stroke: "black", fontSize: 14 }}
                  interval={isAboveMd ? (isAboveLg ? 1 : 2) : 3}
                  angle={-20}
                  dy={10}
                />
                <YAxis tick={{ stroke: "black", fontSize: 14 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="borrow_count"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
