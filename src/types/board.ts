import { BoardListResponse } from "./boardList";
import { LabelResponse } from "./label";
import { UserSummaryResponse } from "./user";

export interface BoardResponse {
  boardId: number;
  boardTitle: string;
  createAt: string;
  color: string;
  boardLists: BoardListResponse[];
  label: LabelResponse[];
}

export interface BoardSumResponse {
  boardId: number;
  boardTitle: string;
  createAt: string;
  color: string;
}

export interface BoardRequest {
  workspaceId: number;
  boardTitle: string;
}

export interface BoardMemberId {
  boardId: number;
  userId: number;
}
export interface BoardMemberResponse {
  boardMemberId: BoardMemberId;
  role: string;
  user: UserSummaryResponse;
  board: BoardSumResponse;
}

export interface BoardMemberRequest {
  boardId: number;
  userId: number;
}
