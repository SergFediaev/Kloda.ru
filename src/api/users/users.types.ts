export type UserResponse = {
  id: number
  username: string
  email: string
  createdCardsCount: number
  favoriteCardsCount: number
  likedCardsCount: number
  dislikedCardsCount: number
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
