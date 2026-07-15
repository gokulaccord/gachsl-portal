export interface Document {

  documentId: number;

  title: string;

  description: string;

  categoryId: number;

  categoryName: string;

  publishDate: Date;

  displayOrder: number;

  isActive: boolean;

  googleDriveFileId: string;

  fileName: string;

  fileExtension: string;

  mimeType: string;

  fileSize: number;
}