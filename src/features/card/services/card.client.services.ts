import axiosClient from "@/src/lib/axiosClient";
import { CardRequest } from "@/src/types/card";
import { CommentRequest } from "@/src/types/comment";

export const getCardDetailById = async (cardId: number) => {
  return axiosClient.get(`/cards/v1/${cardId}`);
};
export const createCard = async (data: CardRequest) => {
  const formData = new FormData();
  formData.append("cardRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.post(`/cards/v1`, formData);
};

export const updateCard = async (cardId: number, data: CardRequest) => {
  const formData = new FormData();
  formData.append("cardRequest", new Blob([JSON.stringify(data)], { type: "application/json" }));
  return axiosClient.put(`/cards/v1/${cardId}`, formData);
};

export const getCardSumById = async (cardId: number) => {
  return axiosClient.get(`/cards/v1/cardSummary/${cardId}`);
};

export const addLabelToCard = async (cardId: number, labelId: number) => {
  return axiosClient.post(`/cards/v1/${cardId}/cardLabels/${labelId}`);
};

export const deleteLabelFromCard = async (cardId: number, labelId: number) => {
  return axiosClient.delete(`/cards/v1/${cardId}/cardLabels/${labelId}`);
};

export const addAssigneeToCard = async (cardId: number, assigneeId: number) => {
  return axiosClient.post(`/cards/v1/${cardId}/cardAssignees/${assigneeId}`);
};

export const deleteAssigneeFromCard = async (cardId: number, assigneeId: number) => {
  return axiosClient.delete(`/cards/v1/${cardId}/cardAssignees/${assigneeId}`);
};

export const createAttachment = async (cardId: number, file: File) => {
  const formData = new FormData();
  if (file) {
    const actualFile = file instanceof FileList ? file[0] : file;
    if (actualFile) {
      formData.append("file", actualFile);
    }
  }
  return axiosClient.post(`/cards/v1/${cardId}/attachments`, formData);
};

export const deleteAttachment = async (attachmentId: number) => {
  return axiosClient.delete(`/cards/v1/attachments/${attachmentId}`);
};

export const createComment = async (commentRequest: CommentRequest) => {
  const formData = new FormData();
  formData.append("commentRequest", new Blob([JSON.stringify(commentRequest)], { type: "application/json" }));
  return axiosClient.post(`/cards/v1/${commentRequest.cardId}/comments`, formData);
};

export const createCommentReply = async (commentParentId: number, commentRequest: CommentRequest) => {
  const formData = new FormData();
  formData.append("commentRequest", new Blob([JSON.stringify(commentRequest)], { type: "application/json" }));
  return axiosClient.post(`/cards/v1/${commentRequest.cardId}/comments/${commentParentId}`, formData);
};

export const updateComment = async (commentId: number, commentRequest: CommentRequest) => {
  const formData = new FormData();
  formData.append("commentRequest", new Blob([JSON.stringify(commentRequest)], { type: "application/json" }));
  return axiosClient.put(`/cards/v1/comments/${commentId}`, formData);
};

export const deleteComment = async (commentId: number) => {
  return axiosClient.delete(`/cards/v1/comments/${commentId}`);
};

export const moveCard = async (cardId: number, newOrderIndex: number, newBoardListId: number) => {
  return axiosClient.put(`/cards/v1/moveCard/${cardId}`, { newOrderIndex, newBoardListId });
};

export const archiveCard = async (cardId: number) => {
  return axiosClient.delete(`/cards/v1/archive/${cardId}`);
};

export const getCardsArchiveByBoard = async (boardId: number) => {
  return axiosClient.get(`/cards/v1/cardsArchive/${boardId}`);
};

export const restoreCard = async (cardId: number) => {
  return axiosClient.put(`/cards/v1/restore/${cardId}`);
};
export const deleteCard = async (cardId: number) => {
  return axiosClient.delete(`/cards/v1/${cardId}`);
};
