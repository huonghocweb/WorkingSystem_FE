"use client";

import { BoardListResponse } from "@/src/types/boardList";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { KanbanCard } from "./KanbanCard";
import { useDroppable } from "@dnd-kit/core";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "../../components/Header.module.css";
import { useDeleteBoardList } from "@/src/hooks/useBoardListMutation";
interface KanbanBoardListProps {
  boardList: BoardListResponse;
  workspaceId: number;
  boardId: number;
  openCardModal: (boardListId: number) => void;
}

export const KanbanBoardList = ({ boardList, workspaceId, boardId, openCardModal }: KanbanBoardListProps) => {
  const { setNodeRef } = useDroppable({
    id: `boardList-${boardList.boardListId}`,
  });
  const { mutate: archiveBoardList, isPending: isDeleteBoardList } = useDeleteBoardList(boardId);
  const handleDeleteBoardList = (boardListId: number) => {
    archiveBoardList(boardListId);
  };

  return (
    <div className="kanban-column">
      <div className="kanban-header">
        <span className="kanban-title">{boardList.boardListTitle}</span>
        <span className="kanban-count">{boardList.cards.length}</span>
        <ul className={style.nav}>
          <li className={style.submenu}>
            <a href="#">...</a>
            <ul>
              <li>
                <button onClick={() => handleDeleteBoardList(boardList.boardListId)} className="btn">
                  <i className="fa-solid fa-box-archive" style={{ color: "red" }}></i>Archive List
                </button>
              </li>
              <li>
                <button className="btn"> List</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="kanban-cards">
        <SortableContext
          id={`boardList-${boardList.boardListId.toString()}`}
          items={boardList.cards.map((c) => c.cardId.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setNodeRef} style={{ minHeight: "150px" }}>
            {boardList.cards.map((card, index) => (
              <KanbanCard key={card.cardId} boardId={boardId} workspaceId={workspaceId} card={card} />
            ))}
          </div>
        </SortableContext>
        <button
          className="btn btn-primary"
          style={{ width: "50%", height: "30px" }}
          onClick={() => openCardModal(boardList.boardListId)}
        >
          +Add card
        </button>
      </div>
    </div>
  );
};
