"use client";

import ModalWrapper from "@/src/components/ModalWrapper";
import { useModal } from "@/src/store/useModalStore";
import { BoardMembersUI } from "./BoardMembersUI";
import { useQuery } from "@tanstack/react-query";
import { getBoardMemberNotInCard, getBoardMembersByBoardId } from "../../services/board.client.services";
import { getWorkspaceMemberNotInBoard } from "@/src/features/workspace/services/workspace.client.service";
import { useAddMemberToBoardMutation, useDeleteMemberFromBoardMutation } from "@/src/hooks/useBoardMutation";
import { showToast } from "@/src/utils/notification";
import { BoardMemberId, BoardMemberRequest } from "@/src/types/board";
import { useAddAssigneeToCardMutation, useDeleteAssigneeFromCard } from "@/src/hooks/useCardMutations";
import { getCardSumById } from "@/src/features/card/services/card.client.services";

export const BoardMember = () => {
  const { isOpen, data, onClose, type } = useModal();
  const isOpenModal = isOpen && type === "boardMember";

  const { mutate: addMemberToBoard, isPending: isAddMemToBoard } = useAddMemberToBoardMutation();
  const { mutate: deleteMemberFromBoard, isPending: isDeleteMemFromBoard } = useDeleteMemberFromBoardMutation();
  const { mutate: addAssigneeToCard, isPending: isAddAssigneeToCard } = useAddAssigneeToCardMutation();
  const { mutate: deleteAssigneeFromCard, isPending: isDeleteAssgineeFromCard } = useDeleteAssigneeFromCard();

  const { data: cardAssignees, isPending: isCardAssignees } = useQuery({
    queryKey: ["card-assignees"],
    queryFn: async () => {
      const res = await getCardSumById(data?.cardId);
      return res.data?.users;
    },
    initialData: [],
    staleTime: 0,
    enabled: !!data?.cardId,
  });

  const { data: boardMembers, isPending: isBoardMembers } = useQuery({
    queryKey: ["board-members", data?.boardId],
    queryFn: async () => {
      const res = data?.cardId
        ? await getBoardMemberNotInCard(data?.boardId, data?.cardId)
        : await getBoardMembersByBoardId(data?.boardId);
      console.log(res.data);
      return res.data;
    },
    initialData: [],
    enabled: isOpenModal && !!data.boardId,
    staleTime: 0,
  });
  const { data: workspaceMember, isPending: isWorkspaceMember } = useQuery({
    queryKey: ["workspace-members", data?.workspaceId],
    queryFn: async () => {
      const res = await getWorkspaceMemberNotInBoard(data?.workspaceId, data?.boardId);
      console.log(res.data);
      return res.data;
    },
    initialData: [],
    enabled: isOpenModal && !!data?.workspaceId,
    staleTime: 0,
  });
  const handleAddMemberToBoard = (userId: number | string) => {
    const boardMemberRequest: BoardMemberRequest = {
      boardId: data?.boardId,
      userId: userId,
    };
    const options = {
      onSuccess: () => {
        showToast("success", "Add member to Board success");
      },
      onError: (error: Error) => {
        showToast("error", `${error.message}`);
      },
    };
    addMemberToBoard(boardMemberRequest, options);
  };
  const handleDeleteMemberFromBoard = (boardMemberId: BoardMemberId) => {
    const options = {
      onSuccess: () => {
        showToast("success", "Delete Member success");
      },
      onError: (error: Error) => {
        showToast("error", error.message);
      },
    };
    deleteMemberFromBoard(boardMemberId, options);
  };

  const handleAddAssigneeToCard = (assigneeId: number) => {
    console.log("cardId", data?.cardId);
    const options = {
      onSuccess: () => {
        showToast("success", "add success");
      },
      onError: (error: Error) => {
        showToast("error", error.message);
      },
    };
    addAssigneeToCard({ cardId: data?.cardId, assigneeId: assigneeId }, options);
  };
  const handleDeleteAssigneeFromCard = (assigneeId: number) => {
    deleteAssigneeFromCard({ cardId: data?.cardId, assigneeId: assigneeId });
  };
  return (
    <>
      {isOpenModal && (
        <ModalWrapper onClose={onClose}>
          <BoardMembersUI
            isLoading={
              isBoardMembers || isWorkspaceMember || isAddMemToBoard || isDeleteMemFromBoard || isCardAssignees
            }
            cardAssignees={cardAssignees}
            boardMembers={boardMembers}
            workspaceMember={workspaceMember}
            handleAddMemberToBoard={handleAddMemberToBoard}
            handleDeleteMemberFromBoard={handleDeleteMemberFromBoard}
            handleAddAssigneeToCard={handleAddAssigneeToCard}
            handleDeleteAssigneeFromCard={handleDeleteAssigneeFromCard}
          />
        </ModalWrapper>
      )}
    </>
  );
};
