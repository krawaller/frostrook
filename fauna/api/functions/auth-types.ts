export type LoginResult = {
  account: {
    email: string
  }
  user: {
    name: string
    hash: string
  }
  secret: string
}
