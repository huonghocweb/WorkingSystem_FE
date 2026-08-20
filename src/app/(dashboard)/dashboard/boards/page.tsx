import BoardDashboard from "@/src/features/dashboard/boardDashboard/components/BoardDashboard";
import { getBoardDashboardById } from "@/src/features/dashboard/boardDashboard/services/boardDashboard.server.service";

interface PageProps {
  searchParams: Promise<{ boardId: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const boardId = Number((await searchParams).boardId);
  console.log("boardId", boardId);
  const boardDashboardDTO = await getBoardDashboardById(boardId);
  console.log("boardDashBoard: ", boardDashboardDTO);
  return (
    <>
      <BoardDashboard boardDashboardDTO={boardDashboardDTO} />
    </>
  );
}
