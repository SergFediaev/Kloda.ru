export const handleCategories = (categories: string) =>
  categories
    .trim()
    .split(',')
    .map(category => category.trim())
    .filter(Boolean)
