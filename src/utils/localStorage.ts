export const getLocalItem = <T>(key: string, defaultItem: T): T => {
  const item = localStorage.getItem(key)

  return item ? JSON.parse(item) : defaultItem
}

export const setLocalItem = <T>(key: string, item: T) =>
  localStorage.setItem(key, JSON.stringify(item))
