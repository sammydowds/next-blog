export interface NoteFrontMatter {
  id: string
  title: string
  description: string
  date: string
  heroImage: string
}

export interface Note {
  data: NoteFrontMatter,
  content: string
}