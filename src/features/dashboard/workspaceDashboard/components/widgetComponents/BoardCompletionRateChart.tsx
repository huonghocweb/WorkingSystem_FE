"use client";

import { METRIC_THRESHOLDS } from "@/src/lib/threshold";
import { BoardOverviewDTO } from "@/src/types/dashoard/board/boardOverviewDTO";
import { getMetricStatus } from "@/src/utils/statusHelper";
import { getTimeAgo } from "@/src/utils/timeAgoHelper";
import { useRouter } from "next/navigation";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";

interface CompletionRateChartProps {
  boardOverviewDTOs: BoardOverviewDTO[];
}

export const CompletionRateChart = ({ boardOverviewDTOs }: CompletionRateChartProps) => {
  const chartData = [...boardOverviewDTOs].sort((a, b) => b.completionRate - a.completionRate);
  const router = useRouter();
  return (
    <div className="two-col">
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Boards Completion</h5>
        </div>
        <div className="chart-container">
          <div className="chart-scroll">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  top: 10,
                  right: 40,
                  bottom: 10,
                  left: 20,
                }}
              >
                <CartesianGrid horizontal={false} vertical={true} stroke="var(--border-color)" strokeDasharray="3 3" />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 13,
                  }}
                />

                <YAxis
                  type="category"
                  dataKey="boardTitle"
                  width={140}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 13,
                  }}
                />

                <Tooltip formatter={(value) => [`${value}%`, "Completion"]} />

                <Bar dataKey="completionRate" fill="var(--accent)" radius={[0, 4, 4, 0]} barSize={24}>
                  {/* <LabelList
                    dataKey="completionRate"
                    position="center"
                    formatter={(value) => `${value}%`}
                    fontSize={11}
                  /> */}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Boards Needing Attention</h5>
        </div>

        <div className="list-group list-group-flush">
          {boardOverviewDTOs.map((board) => {
            const status = getMetricStatus(board.overdueRate, METRIC_THRESHOLDS.BOARD.OVERDUE_CARD);
            return (
              <div key={board.boardId} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{board.boardTitle}</h6>

                  <div className="small text-muted">
                    Completion {board.completionRate}% · {board.overdueCards} overdue · {board.activeCards} active
                  </div>

                  <div className="small text-muted mt-1">Last activity: {getTimeAgo(board.lastActivityAt)}</div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <span
                    className={`badge bg-${status}`}
                    style={{
                      width: "10px",
                      height: "10px",
                      display: "inline-block",
                    }}
                  />

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => router.push(`/dashboard/boards?boardId=${board.boardId}`)}
                  >
                    View →
                  </button>
                </div>
              </div>
            );
          })}

          {boardOverviewDTOs.length === 0 && <div className="list-group-item text-muted">All boards are healthy.</div>}
        </div>
      </div>
    </div>
  );
};
