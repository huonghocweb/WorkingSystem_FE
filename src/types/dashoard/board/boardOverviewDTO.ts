export interface BoardOverviewDTO {
  boardId: number;
  boardTitle: string;
  totalMember: number;
  totalCards: number;
  completedCards: number;
  overdueCards: number;
  activeCards: number;
  completionRate: number;
  overdueRate: number;
  lastActivityAt: string;
}
