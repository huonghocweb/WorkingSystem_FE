"use client";
import { ActivityLogs } from "../features/board/components/ActivityLogs";
import { BoardLabel } from "../features/board/components/BoardLabels";
import { BoardMember } from "../features/board/components/BoardMembers";
import { BoardListForm } from "../features/boardList/components/BoardListForm";
import { CardsArchive } from "../features/card/components/CardArchive";
import { WorkspaceMember } from "../features/workspace/components/WorkspaceMember";
import { useModal } from "../store/useModalStore";

export const ModalProvider = () => {
  const { type } = useModal();
  return (
    <>
      {type === "workspaceMember" && <WorkspaceMember />}
      {type === "boardMember" && <BoardMember />}
      {type === "boardLabel" && <BoardLabel />}
      {type === "boardActivity" && <ActivityLogs />}
      {type === "boardListForm" && <BoardListForm />}
      {type === "cardsArchive" && <CardsArchive />}
    </>
  );
};
