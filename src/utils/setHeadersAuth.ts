export const setHeadersAuth = (headers: Headers) => {
  const accessToken = sessionStorage.getItem('access_token')

  if (!accessToken) {
    return
  }

  headers.set('Authorization', `Bearer ${accessToken}`)
}
