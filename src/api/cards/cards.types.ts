export type CardArgs = {
  title: string
  content: string
  categories: string[]
  authorId: number
}

export type CardResponse = {
  id: number
  title: string
  content: string
  categories: string[]
  favorites: number
  likes: number
  dislikes: number
  authorId: string
  createdAt: string
  updatedAt: string
  isFavorite: boolean
  isLiked: boolean
  isDisliked: boolean
}

export type CardsArgs = {
  search: string
  page: number
  limit: number
  order: string
  sort: string
  categories: string[]
  userId?: number
  action?: string
}

export type CardsResponse = {
  cards: CardResponse[]
  totalCards: number
  totalPages: number
}

export type FavoriteResponse = {
  isFavorite: boolean
}

export type LikeResponse = {
  isLiked: boolean
}

export type DislikeResponse = {
  isDisliked: boolean
}
