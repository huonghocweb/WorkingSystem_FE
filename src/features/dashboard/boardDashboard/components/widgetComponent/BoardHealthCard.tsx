"use client";

import { BoardHealthDTO } from "@/src/types/dashoard/board/HealthBoard/boardHealthDTO";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface BoardHealthCardProps {
  boardHealthDTO: BoardHealthDTO;
}

export const BoardHealthCard = ({ boardHealthDTO }: BoardHealthCardProps) => {
  console.log(boardHealthDTO);
  const safeScore = !isNaN(boardHealthDTO.healthScore) ? boardHealthDTO.healthScore : 0;
  const gaugeData = [
    { name: "Score", value: safeScore },
    { name: "Remaining", value: Math.max(0, 100 - safeScore) },
  ];
  const gaugeColor = safeScore >= 80 ? "#10b981" : safeScore >= 50 ? "#f59e0b" : "#ef4444";
  const STATUS_MAP: Record<string, string> = {
    GOOD: "bg-success",
    LOW: "bg-warning",
    BALANCE: "bg-warning",
    BAD: "bg-danger",
    HIGH: "bg-danger",
  };
  return (
    <>
      <div className="two-col">
        <div className="card shadow-sm border-0">
          <div className="card-header ">
            <div className="d-flex align-items-center">
              <h5 className="mb-2">Board Health Overview</h5>
            </div>
            <span className={`badge ${STATUS_MAP[boardHealthDTO.healthyStatus]}`}>
              Status: {boardHealthDTO.healthyStatus}
            </span>
          </div>

          <div className="card-body d-flex flex-column justify-content-between p-3">
            {/* Gauge Chart */}
            <div style={{ width: "100%", height: 150, minHeight: 150 }} className="position-relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="80%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={58}
                    outerRadius={78}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    <Cell key="score" fill={gaugeColor} />
                    <Cell key="remaining" fill="#f1f5f9" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div
                className="position-absolute text-center"
                style={{
                  top: "65%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className="display-6 fw-extrabold lh-1" style={{ color: gaugeColor }}>
                  {safeScore}
                </span>
                <div className="text-muted small fw-semibold" style={{ fontSize: "11px" }}>
                  HEALTH SCORE
                </div>
              </div>
            </div>

            {boardHealthDTO.healthyMetrics && (
              <div className="mt-3 pt-3 border-top">
                <div className="row g-2">
                  {boardHealthDTO.healthyMetrics.completionRate !== undefined && (
                    <div className="col-3">
                      <div className="stat-box">
                        <h6>Completion</h6>
                        <div className="text-dark mt-1">{boardHealthDTO.healthyMetrics.completionRate}%</div>
                      </div>
                    </div>
                  )}
                  {boardHealthDTO.healthyMetrics.overDueRate !== undefined && (
                    <div className="col-3">
                      <div className="stat-box">
                        <h6 className="text-muted ">Overdue</h6>
                        <div className="text-danger mt-1">{boardHealthDTO.healthyMetrics.overDueRate}%</div>
                      </div>
                    </div>
                  )}
                  {boardHealthDTO.healthyMetrics.highRiskCard !== undefined && (
                    <div className="col-3">
                      <div className="stat-box">
                        <h6>HighRisk Card</h6>
                        <div className="text-dark">{boardHealthDTO.healthyMetrics.highRiskCard}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Card  */}
        {/* Right Card */}
        <div className="card shadow-sm border-0">
          <div className="card-header bg-transparent border-bottom d-flex justify-content-between align-items-center py-3">
            <h6 className="mb-0 fw-bold">Health Issues</h6>

            <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-2">
              {boardHealthDTO.healthIssues.length} Active Issues
            </span>
          </div>

          <div className="card-body p-0" style={{ maxHeight: "290px", overflowY: "auto" }}>
            {boardHealthDTO.healthIssues.length === 0 ? (
              <div className="text-center text-muted py-5">
                <div className="mb-2" style={{ fontSize: "24px" }}>
                  🎉
                </div>

                <div className="fw-medium">No issues detected!</div>

                <small className="text-muted">This board is operating at peak health.</small>
              </div>
            ) : (
              boardHealthDTO.healthIssues.map((issue, index) => (
                <div key={index} className={`audit-row audit-row--${issue.severity.toLowerCase()}`}>
                  {/* Issue */}
                  <div className="me-3 flex-grow-1">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className={`badge ${STATUS_MAP[issue.severity]}`}>{issue.severity}</span>
                      <span className="fw-semibold text-dark small">{issue.description}</span>
                    </div>
                  </div>

                  {/* Actual Value */}
                  <div className="text-end flex-shrink-0 me-4" style={{ minWidth: "70px" }}>
                    <div className="text-muted">Actual</div>

                    <div className="fw-semibold text-dark">
                      {issue.actualValue}
                      {issue.unit}
                    </div>
                  </div>

                  {/* Threshold */}
                  <div className="text-end flex-shrink-0" style={{ minWidth: "80px" }}>
                    <div className="text-muted">Threshold</div>

                    <div className="fw-semibold text-dark">
                      {issue.threshold}
                      {issue.unit}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
