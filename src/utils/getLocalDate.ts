export const getLocalDate = (date?: string) =>
  (date ? new Date(date) : new Date()).toLocaleString('ru')
