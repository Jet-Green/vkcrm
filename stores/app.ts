import { defineStore } from "pinia"
import AppApi from '../api/AppApi'

// interfaces
import type { App } from "../types/app.interface"


export const useApp = defineStore('app', () => {
  let restFilter = ref ('')
  let managerMenuFilter = ref ('')
  let appState = ref<App>()

  async function createFoodCategory(category: string[]) {
    return await AppApi.createFoodCategory(category)
  }

  async function getFoodCategory() {
    return await AppApi.getFoodCategory()
  }
  async function deleteFoodCategory (category: string) {
    return await AppApi.deleteFoodCategory(category)
  }
  async function getAppState() {
    let res = await AppApi.getAppState()
    appState.value = res.data.value
    return res
  }

  return {
    // functions
    createFoodCategory, getFoodCategory, deleteFoodCategory, getAppState, restFilter,managerMenuFilter,
    // variables
    appState
  }
})