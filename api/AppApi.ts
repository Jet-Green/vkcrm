
export default {
  createFoodCategory(category: string[]): Promise<any> {
    return useApiFetch('/app-state/create-food-category', { method: 'POST', body: { category } })
  },
  getFoodCategory() {
    return useApiFetch('/app-state/get-food-categories', { method: 'GET' })
  },
  deleteFoodCategory(category: string) {
    return useApiFetch(`/app-state/delete-food-category?category=${category}`, { method: 'GET' })
  },
  getAppState(): Promise<any> {
    return useApiFetch('/app-state', { method: 'GET' })
  }
}