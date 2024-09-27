export type RegisterArgs = {
  username: string
  email: string
  password: string
}

export type RegisterResponse = {
  accessToken: string
  id: number
}

export type LoginArgs = {
  email: string
  password: string
}

// ToDo: Duplicate types
export type LoginResponse = {
  accessToken: string
  id: number
}

export type RefreshResponse = {
  accessToken: string
}
