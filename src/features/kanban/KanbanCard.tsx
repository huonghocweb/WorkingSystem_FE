"use client";
import { useArchiveCard } from "@/src/hooks/useCardMutations";
import style1 from "../../components/Header.module.css";
import { CardSumResponse } from "@/src/types/card";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { showToast } from "@/src/utils/notification";

interface KanbanCardProps {
  card: CardSumResponse;
  workspaceId: number;
  boardId: number;
}

export const KanbanCard = ({ card, workspaceId, boardId }: KanbanCardProps) => {
  const { mutate: archiveCardMutate, isPending: isArchiveCard } = useArchiveCard();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.cardId.toString(),
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 100 : "auto",
  };
  const handleArchiveCard = (cardId: number) => {
    const options = {
      onError: (error: Error) => {
        showToast("error", error.message);
      },
    };
    archiveCardMutate(cardId, options);
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`kanban-card ${isDragging ? "dragging" : ""}`}
    >
      <div className="kanban-card-header">
        <Link href={`/workspaces/${workspaceId}/boards/${boardId}/card/${card.cardId}`}>
          <div className="kanban-card-title">{card.cardTitle}</div>
          <div className="kanban-card-desc">{card.cardDescription}</div>
        </Link>
        <ul className={style1.nav}>
          <li className={style1.submenu}>
            <a href="#">...</a>
            <ul>
              <li>
                <button onClick={() => handleArchiveCard(card.cardId)} className="btn">
                  <i className="fa-solid fa-box-archive" style={{ color: "red" }}></i>Archive Card
                </button>
              </li>
              <li>
                <button className="btn"> List</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="kanban-card-footer">
        <div
          className="card-labels-container"
          style={{ display: "flex", gap: "4px", marginBottom: "8px", flexWrap: "wrap" }}
        >
          {card.labels &&
            card.labels.map((label, labelIndex) => (
              <span
                key={labelIndex}
                className="label-mini"
                style={{
                  backgroundColor: label.labelColor,
                }}
                title={label.labelName}
              ></span>
            ))}
        </div>
        <div className="avatar-group">
          {card.users &&
            card.users.map((user, userIndex) => (
              <div key={userIndex} className="avatar" title={user.userName}>
                {user.imageUrl ? (
                  <img src={user.imageUrl} />
                ) : (
                  <span className="avatar-fallback">{user.userName ? user.userName.charAt(0) : "?"}</span>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
