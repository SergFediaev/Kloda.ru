export const handleCategories = (categories: string) =>
  categories
    .split(',')
    .map(category => category.trim())
    .filter(Boolean)
