import { UserSummaryResponse } from "./user";

export interface CommentResponse {
  commentId: number;
  commentContent: string;
  user: UserSummaryResponse;
  createAt: string;
  updateAt: string;
  parentId: number;
  replies: CommentResponse[];
}

export interface CommentRequest {
  commentContent: string;
  userId?: number;
  cardId: number;
}
