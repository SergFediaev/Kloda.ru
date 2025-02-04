export type UserResponse = {
  id: string
  username: string
  email: string
  createdCardsCount: string
  favoriteCardsCount: string
  likedCardsCount: string
  dislikedCardsCount: string
  registeredAt: string
  lastLoginAt: string
}

export type UsersArgs = {
  search: string
  page: string
  limit: string
  order: string
  sort: string
}

export type UsersResponse = {
  users: UserResponse[]
  totalUsers: number
  totalPages: number
}
