import { METRIC_THRESHOLDS } from "@/src/lib/threshold";
import { MemberCardsStatsDTO } from "@/src/types/dashoard/workspace/memberCardsStatsDTO";
import { getMetricStatus } from "@/src/utils/statusHelper";
import { useMemo } from "react";

interface MemberCardsStatsProps {
  memberCardsStats: MemberCardsStatsDTO[];
}

export const MemberCardsStats = ({ memberCardsStats }: MemberCardsStatsProps) => {
  console.log("memCardsStats: ", memberCardsStats);
  const memberProgressStats = useMemo(() => {
    return memberCardsStats.map((memCard) => ({
      ...memCard,
      progressStatus: getMetricStatus(memCard.progress, METRIC_THRESHOLDS.USER.COMPLETION),
      overdueStatus: getMetricStatus(memCard.overdueCards, METRIC_THRESHOLDS.USER.OVERDUE_CARD),
    }));
  }, [memberCardsStats]);
  console.log("new ", memberCardsStats);
  return (
    <>
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">MemberCard Stats </h3>
            <p className="card-subtitle">Work distribution and progress by team member</p>
          </div>
          <button className="btn btn-ghost">View All</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>NO.</th>
                <th>Member</th>
                <th>Avatar</th>
                <th>Progress</th>
                <th>Active </th>
                <th>Overdue</th>
              </tr>
            </thead>
            <tbody>
              {memberProgressStats.map((memberCard, index) => (
                <tr key={memberCard.userId}>
                  <td>#{index}</td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{memberCard.userName}</div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>Role</div>
                  </td>
                  <td>
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={memberCard.imageUrl}
                    />
                  </td>
                  <td>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${memberCard?.progressStatus}`}
                        style={{ width: `${memberCard.progress ?? 0}%` }}
                      >
                        <span className="progress-rate">{memberCard.progress ?? 0}%</span>
                      </div>
                    </div>
                    Completed : {memberCard.completedCards} / {memberCard.totalCards} Tasks
                  </td>
                  <td>{memberCard.activeCards} Tasks</td>
                  <td>
                    <span className={`badge badge-${memberCard.overdueStatus}`}>{memberCard.overdueCards} Tasks</span>
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
