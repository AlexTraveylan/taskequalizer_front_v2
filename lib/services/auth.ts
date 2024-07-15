export const extractAuthTokenFromLocalStorage = () => {
  const token = localStorage.getItem("auth_token")

  return `Bearer ${token}`
}
