export type CardModel = {
  id: string
  title: string
  content: string
  categories: string[]
  favorites: string
  likes: string
  dislikes: string
  authorId: string
  authorUsername: string
  createdAt: string
  updatedAt: string
  isFavorite: boolean
  isLiked: boolean
  isDisliked: boolean
}

export type CardArgs = {
  id: string
  categories?: string[]
}

export type RandomCardArgs = {
  currentCardId: string
  categories: string[]
}

export type CreateCardArgs = {
  title: string
  content: string
  categories: string[]
  authorId: string
}

export type EditCardArgs = {
  id: string
} & Omit<CreateCardArgs, 'authorId'>

export type CardsArgs = {
  search: string
  page: string
  limit: string
  order: string
  sort: string
  categories: string[]
  userId?: string
  action?: string
}

export type CardResponse = {
  card: CardModel
  cardPosition: string
  prevCardId: string
  nextCardId: string
  totalCards: number
}

export type CardsResponse = {
  cards: CardModel[]
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

export type ImportCardsArgs = {
  spreadsheetId: string
  sheetName: string
  skipFirstRow: boolean
  skipFirstColumn: boolean
}

export type ImportCardsResponse = {
  importedCardsCount: number
}

export type DeleteCardsResponse = {
  deletedCardsCount: number
}
