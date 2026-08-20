"use client";

import { BoardListStatisticsDTO } from "@/src/types/dashoard/board/boardListStatistics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CustomToolTip } from "./CustomToolTip";

interface TaskStatusStatisticsProps {
  boardListStatisticsDTOs: BoardListStatisticsDTO[];
}

export const TaskStatusStatisticsCard = ({ boardListStatisticsDTOs }: TaskStatusStatisticsProps) => {
  console.log("boardListStatisticsDTOs: ", boardListStatisticsDTOs);

  return (
    <>
      <div className="card-header">
        <h5 className="mb-0">Phase Statistics </h5>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={boardListStatisticsDTOs}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="boardListTitle" />

          <YAxis />

          <Tooltip content={<CustomToolTip />} />

          <Legend />

          <Bar dataKey="onTrackCount" name="On Track" stackId="status" fill="#22c55e" />

          <Bar dataKey="overdueCount" name="Overdue" stackId="status" fill="#ef4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
