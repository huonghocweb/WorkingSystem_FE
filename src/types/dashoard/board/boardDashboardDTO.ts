import { BoardHealthDTO } from "./HealthBoard/boardHealthDTO";
import { PhaseBottleneckDTO } from "./phaseBottlenecks";
import { BoardListStatisticsDTO } from "./boardListStatistics";

export interface BoardDashboardDTO {
  boardHealthDTO: BoardHealthDTO;
  boardListStatisticsDTOs: BoardListStatisticsDTO[];
  phaseBottleneckDTOs: PhaseBottleneckDTO[];
}
