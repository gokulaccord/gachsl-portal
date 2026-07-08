export interface Notice {

  noticeId: number;

  title: string;

  description: string;

  publishDate: string;

  category?: string;

  priority?: string;

  attachmentUrl?: string;

  isPublished: boolean;

  isActive: boolean;

  createdOn: string;

  updatedOn?: string;

  createdBy: number;
}