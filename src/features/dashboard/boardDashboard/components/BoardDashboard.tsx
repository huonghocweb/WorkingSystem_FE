"use client";

import { BoardDashboardDTO } from "@/src/types/dashoard/board/boardDashboardDTO";
import { BoardHealthCard } from "./widgetComponent/BoardHealthCard";
import { TaskStatusStatisticsCard } from "./widgetComponent/boardListStatistic/BoardListStatistics";
import { PhaseBottleneckCard } from "./widgetComponent/PhaseBottleneck";

interface BoardDashboardProps {
  boardDashboardDTO: BoardDashboardDTO;
}

export const BoardDashboard = ({ boardDashboardDTO }: BoardDashboardProps) => {
  console.log("boardDashBoard:  ", boardDashboardDTO);
  return (
    <>
      <BoardHealthCard boardHealthDTO={boardDashboardDTO.boardHealthDTO} />
      <div className="two-col">
        <div className="card">
          {" "}
          <TaskStatusStatisticsCard boardListStatisticsDTOs={boardDashboardDTO.boardListStatisticsDTOs} />
        </div>
        <div className="card">
          <PhaseBottleneckCard phaseBottlenecks={boardDashboardDTO.phaseBottleneckDTOs} />
        </div>
      </div>
    </>
  );
};

export default BoardDashboard;
