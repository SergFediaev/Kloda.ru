export type CardArgs = {
  title: string
  content: string
  categories: string[]
  likes: number
  dislikes: number
  authorId: string
}

export type CardResponse = {
  id: number
  title: string
  content: string
  categories: string[]
  likes: number
  dislikes: number
  authorId: string
  createdAt: string
  updatedAt: string
}
