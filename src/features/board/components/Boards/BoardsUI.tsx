"use client";
import PendingPage from "@/src/components/PendingPage";
import { KanbanBoard } from "@/src/features/kanban/KanbanBoard";
import { useModal } from "@/src/store/useModalStore";
import { BoardRequest, BoardResponse } from "@/src/types/board";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

interface BoardUIProps {
  boardById: BoardResponse;
  formMethod: UseFormReturn<BoardRequest>;
  onSubmit: (data: BoardRequest) => void;
  isPendingUpdate: boolean;
  openCardModal: (boardListId: number) => void;
}

export default function BoardsUI({ boardById, formMethod, onSubmit, isPendingUpdate, openCardModal }: BoardUIProps) {
  const { register, handleSubmit } = formMethod;
  const { workspaceId } = useParams();
  const { onOpen } = useModal();
  const { onOpen: openBoardListForm } = useModal();
  const { onOpen: openCardsArchive } = useModal();
  //console.log(boardById);
  return (
    <>
      {isPendingUpdate && <PendingPage />}
      <div className="mobile-menu-overlay"></div>

      <div className="app-container">
        <main className="main-content">
          <div
            className="page-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="greeting">
                <input
                  style={{ fontSize: "25px" }}
                  {...register("boardTitle", {
                    onBlur: (e) => {
                      handleSubmit(onSubmit)();
                    },
                  })}
                />
              </h1>
            </form>
            <div className="header-right d-flex align-items-center gap-2">
              <button
                onClick={() => onOpen("boardActivity", { boardId: boardById.boardId })}
                className="btn btn-outline-primary px-3"
              >
                ActivityLogs
              </button>
              <button
                onClick={() => onOpen("boardLabel", { boardId: boardById.boardId })}
                className="btn btn-outline-primary px-3"
              >
                Labels
              </button>
              <button
                onClick={() => onOpen("boardMember", { boardId: boardById.boardId, workspaceId: workspaceId })}
                className="btn btn-outline-primary px-3"
              >
                Members
              </button>
              <button className="btn btn-outline-primary px-3"> Settings </button>
              <ul className="nav">
                <li className="submenu">
                  <button className="btn btn-outline-primary">...</button>
                  <ul>
                    <li>
                      <button
                        onClick={() => openCardsArchive("cardsArchive", { boardId: boardById.boardId })}
                        className="btn"
                      >
                        Archive Cards
                      </button>
                    </li>
                    <li>
                      <button className="btn">Archive List</button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="kanban-board">
            <KanbanBoard
              boardById={boardById}
              workspaceId={Number(workspaceId)}
              openCardModal={openCardModal}
            ></KanbanBoard>
            <div className="kanban-column">
              <button
                onClick={() => openBoardListForm("boardListForm", { boardId: boardById.boardId })}
                className="btn btn-primary btn-sm"
              >
                <i className="fa-solid fa-circle-plus"></i>Add List
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
