import { AttachmentResponse } from "./attachment";
import { CommentResponse } from "./comment";
import { LabelResponse } from "./label";
import { UserSummaryResponse } from "./user";

export interface CardSumResponse {
  cardId: number;
  cardTitle: string;
  orderIndex: number;
  deleteAt: string;
  cardDescription: string;
  labels: LabelResponse[];
  users: UserSummaryResponse[];
}

export interface CardResponse {
  cardId: number;
  cardTitle: string;
  cardDescription: string;
  startDate: string;
  endDate: string;
  orderIndex: number;
  deleteAt: string;
  labels: LabelResponse[];
  users: UserSummaryResponse[];
  attachments: AttachmentResponse[];
  comments: CommentResponse[];
  activityLogs: [];
}

export interface CardRequest {
  cardTitle: string;
  cardDescription: string;
  startDate: Date;
  endDate: Date;
  orderIndex: number;
  boardListId: number;
}
