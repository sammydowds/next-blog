export interface NoteFrontMatter extends MetaData {
  id: string;
  title: string;
  description: string;
  date: string;
  heroImage: string;
}

export interface MetaData {
  wordCount?: number;
  estimatedTime?: number;
}
export interface Note extends MetaData {
  data: NoteFrontMatter;
  content: string;
}
