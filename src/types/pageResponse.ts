export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  by: string;
  order: string;
  totalElements: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
