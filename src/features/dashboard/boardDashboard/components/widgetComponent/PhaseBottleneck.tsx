import { METRIC_THRESHOLDS } from "@/src/lib/threshold";
import { PhaseBottleneckDTO } from "@/src/types/dashoard/board/phaseBottlenecks";
import { formatDuration } from "@/src/utils/formatDurationHelper";
import { getMetricStatus } from "@/src/utils/statusHelper";
import { useMemo } from "react";
interface PhaseBottleneckProps {
  phaseBottlenecks: PhaseBottleneckDTO[];
}

export const PhaseBottleneckCard = ({ phaseBottlenecks }: PhaseBottleneckProps) => {
  console.log(phaseBottlenecks);
  const phaseBottlenecksData = useMemo(() => {
    return phaseBottlenecks.map((phase) => ({
      ...phase,
      timeShareStatus: getMetricStatus(phase.timeShareRate, METRIC_THRESHOLDS.BOARD_LIST.TIME_SHARE),
    }));
  }, [phaseBottlenecks]);
  console.log(phaseBottlenecksData);
  return (
    <>
      <div className="card-header">
        <h5 className="mb-0">Timeshare and workflow</h5>
      </div>
      <div className="card flow">
        <div className="table-container ">
          <table>
            <thead>
              <tr>
                <th>NO.</th>
                <th>Phase</th>
                <th>TimeShare of workflow</th>
                <th>Total Entries</th>
                <th>Return rate </th>
              </tr>
            </thead>
            <tbody>
              {phaseBottlenecksData.map((phase, index) => (
                <tr key={phase.boardListTypeId}>
                  <td>#{index + 1}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{phase.boardListTypeTitle}</div>
                  </td>
                  <td>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${phase.timeShareStatus}`}
                        style={{ width: `${phase.timeShareRate}%` }}
                      >
                        <span className="progress-rate">{phase.timeShareRate}%</span>
                      </div>
                    </div>
                    <span style={{ fontSize: "12px" }}>{formatDuration(phase.totalDurationSeconds)}</span>
                  </td>
                  <td>{phase.totalCardEntries}</td>
                  <td>
                    {phase.totalCardEntries > 0
                      ? (((phase.totalCardEntries - phase.totalUniqueCards) * 100) / phase.totalCardEntries).toFixed(1)
                      : "0.0"}{" "}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
