export interface MemberCardsStatsDTO {
  userId: number;
  userName: string;
  imageUrl: string;
  totalCards: string;
  activeCards: number;
  completedCards: number;
  overdueCards: number;
  progress: number;
}
