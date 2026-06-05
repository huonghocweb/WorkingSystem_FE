import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentRequest } from "../types/comment";
import {
  createComment,
  createCommentReply,
  deleteComment,
  updateComment,
} from "../features/card/services/card.client.services";

export const useCreateCommentMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (commentRequest: CommentRequest) => {
      return createComment(commentRequest);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["cardById"] });
    },
  });
};

export const useCreateCommentReplyMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ commentParentId, commentRequest }: { commentParentId: number; commentRequest: CommentRequest }) => {
      return createCommentReply(commentParentId, commentRequest);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["cardById"] });
    },
  });
};

export const useUpdateCommentMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId, commentRequest }: { commentId: number; commentRequest: CommentRequest }) => {
      return updateComment(commentId, commentRequest);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["cardById"] });
    },
  });
};

export const useDeleteCommentMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (commentId: number) => {
      return deleteComment(commentId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["cardById"] });
    },
  });
};
