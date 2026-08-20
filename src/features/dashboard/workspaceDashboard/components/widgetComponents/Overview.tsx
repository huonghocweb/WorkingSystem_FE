import { METRIC_THRESHOLDS } from "@/src/lib/threshold";
import { WorkspaceOverviewDTO } from "@/src/types/dashoard/workspace/workspaceOverviewDTO";
import { getMetricStatus } from "@/src/utils/statusHelper";
interface OverviewProps {
  workspaceOverview: WorkspaceOverviewDTO;
}

export const Overview = ({ workspaceOverview }: OverviewProps) => {
  const activeMemberStatus = getMetricStatus(
    workspaceOverview.activeMemberRate,
    METRIC_THRESHOLDS.WORKSPACE.ACTIVE_MEMBER,
  );
  const completeStatus = getMetricStatus(workspaceOverview.completionRate, METRIC_THRESHOLDS.WORKSPACE.COMPLETION);
  const activeCardStatus = getMetricStatus(workspaceOverview.activeCardRate, METRIC_THRESHOLDS.WORKSPACE.ACTIVE_CARD);
  const overdueCardStatus = getMetricStatus(
    workspaceOverview.overDueCardRate,
    METRIC_THRESHOLDS.WORKSPACE.OVERDUE_CARD,
  );
  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Active Cards </div>
          <div className="stat-value">
            {workspaceOverview.activeCards} / {workspaceOverview.totalCards}
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${activeCardStatus}`}
              style={{ width: `${workspaceOverview.activeCardRate}%` }}
            >
              {" "}
              <span className="progress-rate">{workspaceOverview.activeCardRate}%</span>
            </div>
          </div>
          <div className={`stat-change ${activeCardStatus}`}>
            ActiveCard Today: {workspaceOverview.activeCardsToday}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Active Member</div>
          <div className="stat-value">
            {workspaceOverview.activeMembers} / {workspaceOverview.totalMembers}
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${activeMemberStatus}`}
              style={{ width: `${workspaceOverview.activeMemberRate}%` }}
            >
              <span className="progress-rate">{workspaceOverview.activeMemberRate}%</span>
            </div>
          </div>
          <div className={`stat-change ${activeMemberStatus}`}>ActiveMember Today :</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Overdue Card</div>
          <div className="stat-value">
            {workspaceOverview.overdueCards} / {workspaceOverview.totalCards}
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${overdueCardStatus}`}
              style={{ width: `${workspaceOverview.overDueCardRate}%` }}
            >
              <span className="progress-rate">{workspaceOverview.overDueCardRate}%</span>
            </div>
          </div>
          <div className={`stat-change ${overdueCardStatus}`}>Due Today: {workspaceOverview.dueTodayCards}</div>
        </div>

        <div className="stat-card">
          <div className="stat-label">Completed Card</div>
          <div className="stat-value">
            {workspaceOverview.completedCards}/{workspaceOverview.totalCards}
          </div>
          <div className="progress-bar">
            <div
              className={`progress-fill ${completeStatus}`}
              style={{
                width: `${workspaceOverview.completionRate}%`,
              }}
            >
              {" "}
              <span className="progress-rate">{workspaceOverview.completionRate}%</span>
            </div>{" "}
          </div>
          <div className={`stat-change ${completeStatus}`}>CompletedCards Today:</div>
        </div>
      </div>
    </>
  );
};
