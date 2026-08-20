import type { TooltipProps } from "recharts";
import { BoardListStatisticsDTO } from "@/src/types/dashoard/board/boardListStatistics";
import { formatDuration } from "@/src/utils/formatDurationHelper";

interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    payload: BoardListStatisticsDTO;
  }[];
}
export const CustomToolTip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const data = payload[0].payload as BoardListStatisticsDTO;

  return (
    <div className="bg-white border rounded p-2 shadow-sm">
      <div className="fw-bold mb-2">{data.boardListTitle}</div>

      <div>On Track: {data.onTrackCount}</div>

      <div>Overdue: {data.overdueCount}</div>

      <div>Average Cycle: {formatDuration(data.averageCycle)}</div>
    </div>
  );
};
