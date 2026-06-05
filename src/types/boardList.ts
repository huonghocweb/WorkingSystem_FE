import { CardSumResponse } from "./card";

export interface BoardListResponse {
  boardListId: number;
  boardListTitle: string;
  position: number;
  cards: CardSumResponse[];
}

export interface BoardListRequest {
  boardListTitle: string;
  boardId: number;
}
