import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CardFormValue, mapFormToCardRequest } from "../schema/cardSchema";
import {
  addAssigneeToCard,
  addLabelToCard,
  archiveCard,
  createAttachment,
  createCard,
  deleteAssigneeFromCard,
  deleteAttachment,
  deleteCard,
  deleteLabelFromCard,
  getCardsArchiveByBoard,
  moveCard,
  restoreCard,
  updateCard,
} from "../features/card/services/card.client.services";
import { multipleOf, number } from "zod";
import { ca } from "zod/locales";

interface CardUpdateProps {
  cardId: number;
  dataForm: CardFormValue;
}

export const useCardCreateMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (formData: CardFormValue) => {
      const data = mapFormToCardRequest(formData);
      return createCard(data);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};

export const useCardUpdateMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, dataForm }: CardUpdateProps) => {
      const data = mapFormToCardRequest(dataForm);
      return updateCard(cardId, data);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};

export const useArchiveCard = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (cardId: number) => {
      return archiveCard(cardId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};

export const useAddLabelToCardMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, labelId }: { cardId: number; labelId: number }) => {
      return addLabelToCard(cardId, labelId);
    },
    onSuccess: (data, variables) => {
      query.invalidateQueries({ queryKey: ["boardById"] });
      query.invalidateQueries({ queryKey: ["cardById"] });
      query.invalidateQueries({ queryKey: ["cardLabels"] });
      query.invalidateQueries({ queryKey: ["boardLabels"] });
    },
  });
};

export const useDeleteLabelFromCardMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, labelId }: { cardId: number; labelId: number }) => {
      return deleteLabelFromCard(cardId, labelId);
    },
    onSuccess: (data, variables) => {
      query.invalidateQueries({ queryKey: ["boardById"] });
      query.invalidateQueries({ queryKey: ["cardById"] });
      query.invalidateQueries({ queryKey: ["cardLabels"] });
      query.invalidateQueries({ queryKey: ["boardLabels"] });
    },
  });
};

export const useAddAssigneeToCardMutation = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, assigneeId }: { cardId: number; assigneeId: number }) => {
      return addAssigneeToCard(cardId, assigneeId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
      query.invalidateQueries({ queryKey: ["board-members"] });
      query.invalidateQueries({ queryKey: ["card-assignees"] });
      query.invalidateQueries({ queryKey: ["cardById"] });
    },
  });
};

export const useDeleteAssigneeFromCard = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, assigneeId }: { cardId: number; assigneeId: number }) => {
      return deleteAssigneeFromCard(cardId, assigneeId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
      query.invalidateQueries({ queryKey: ["board-members"] });
      query.invalidateQueries({ queryKey: ["cardById"] });
      query.invalidateQueries({ queryKey: ["card-assignees"] });
    },
  });
};

export const useCreateAttachment = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, file }: { cardId: number; file: File }) => {
      return createAttachment(cardId, file);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
      query.invalidateQueries({ queryKey: ["cardById"] });
    },
  });
};

export const useDeleteAttachment = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (attachmentId: number) => {
      return deleteAttachment(attachmentId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
      query.invalidateQueries({ queryKey: ["cardById"] });
    },
  });
};

export const useMoveCard = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: ({
      cardId,
      newOrderIndex,
      newBoardListId,
    }: {
      cardId: number;
      newOrderIndex: number;
      newBoardListId: number;
    }) => {
      return moveCard(cardId, newOrderIndex, newBoardListId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};

export const useGetCardsArchive = () => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (boardId: number) => {
      return getCardsArchiveByBoard(boardId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById"] });
    },
  });
};

export const useRestoreCard = (boardId: number) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (cardId: number) => {
      return restoreCard(cardId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById", boardId] });
      query.invalidateQueries({ queryKey: ["archiveCards"] });
    },
  });
};

export const useDeleteCard = (boardId: number) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: (cardId: number) => {
      return deleteCard(cardId);
    },
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["boardById", boardId] });
      query.invalidateQueries({ queryKey: ["archiveCards"] });
    },
  });
};
