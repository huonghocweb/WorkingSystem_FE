export interface WorkspaceOverviewDTO {
  totalBoards: number;
  activeBoards: number;
  activeMembers: number;
  totalMembers: number;
  activeMemberRate: number;
  activeCards: number;
  totalCards: number;
  activeCardRate: number;
  completedCards: number;
  completionRate: number;
  overdueCards: number;
  overDueCardRate: number;
  dueTodayCards: number;
  activeCardsToday: number;
  averageResolveTime: number;
}
