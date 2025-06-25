export interface Article {
  _id?: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}
