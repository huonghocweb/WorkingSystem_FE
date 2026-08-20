export interface BoardListStatisticsDTO {
  boardListId: string;
  boardListTitle: string;
  totalCards: number;
  onTrackCount: number;
  overdueCount: number;
  averageCycle: number;
}
