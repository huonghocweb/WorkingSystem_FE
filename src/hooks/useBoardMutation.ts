import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BoardMemberId, BoardMemberRequest, BoardRequest } from "../types/board";
import {
  addMemberToBoard,
  createBoard,
  createBoardLabel,
  deleteBoardLabel,
  deleteMemberFromBoard,
  getActivityLogByBoard,
  updateBoard,
} from "../features/board/services/board.client.services";
import { LabelRequest } from "../types/label";
import { showToast } from "../utils/notification";

interface ActivityProps {
  boardId: number;
  page: number;
  size: number;
  order: string;
  by: string;
}
interface UpdateMutateProps {
  data: BoardRequest;
  boardId: number;
}

export const useCreateBoardMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (data: BoardRequest) => {
      return createBoard(data);
    },
    onSuccess: (res) => {
      console.log("res", res);
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};

export const useUpdateBoardMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ data, boardId }: UpdateMutateProps) => {
      return updateBoard(data, boardId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};

export const useAddMemberToBoardMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (boardMemberRequest: BoardMemberRequest) => {
      return addMemberToBoard(boardMemberRequest);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["board-members"] });
      query.invalidateQueries({ queryKey: ["workspace-members"] });
    },
  });
};

export const useDeleteMemberFromBoardMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (boardMemberId: BoardMemberId) => {
      return deleteMemberFromBoard(boardMemberId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["board-members"] });
      query.invalidateQueries({ queryKey: ["workspace-members"] });
    },
  });
};

export const useCreateBoardLabelMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (labelRequest: LabelRequest) => {
      return createBoardLabel(labelRequest);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardLabels"] });
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};

export const useDeleteBoardLabelMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (labelId: number) => {
      return deleteBoardLabel(labelId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardLabels"] });
      query.invalidateQueries({ queryKey: ["boardLabels"] });
    },
    onError: (error: Error) => {
      showToast("error", error.message);
    },
  });
};

export const useGetActivityLogByBoard = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (props: ActivityProps) => {
      return getActivityLogByBoard(props.boardId, props.page, props.size, props.order, props.by);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};
