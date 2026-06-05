export interface AttachmentResponse {
  attachmentId: number;
  filePublicId: string;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  createAt: string;
}

export interface AttachmentRequest {
  userId: number;
  cardId: number;
}
