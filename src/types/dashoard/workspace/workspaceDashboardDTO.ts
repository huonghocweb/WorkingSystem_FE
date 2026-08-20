import { BoardOverviewDTO } from "../board/boardOverviewDTO";
import { MemberCardsStatsDTO } from "./memberCardsStatsDTO";
import { taskStatusStatisticsDTO } from "../board/boardListStatistics";
import { WorkspaceOverviewDTO } from "./workspaceOverviewDTO";

export interface WorkspaceDashboardDTO {
  workspaceOverviewDTO: WorkspaceOverviewDTO;
  memberCardsStatsDTOs: MemberCardsStatsDTO[];
  // taskStatusStatisticsDTO: taskStatusStatisticsDTO[];
  boardOverviewDTOs: BoardOverviewDTO[];
}
