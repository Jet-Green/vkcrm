import { defineStore } from "pinia"
import AuthAPI from "../api/AuthApi"
import RestApi from "~/api/RestApi"

import type { User } from "../types/user.interface"
import { ref } from "vue"
import type { RestFromDb } from "~/types/rest-from-db.interface"

export const useAuth = defineStore('auth', () => {
  let user = ref<User | null>()
  let redirectTo = ref<string>('/')
  let managingRestObject = ref<any>()

  async function registration(data: any): Promise<boolean> {
    try {
      const response = await AuthAPI.registration(data)
      if (response.data.value) {
        user.value = response.data.value.user
      }
      return true
    } catch {
      return false
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await AuthAPI.login(email, password)
      if (response.data.value) {
        user.value = response.data.value.user
      }
      return response
    } catch {
      return false
    }
  }

  async function checkAuth(): Promise<boolean> {
    try {
      const response = await AuthAPI.refresh()

      if (response.data.value?._id) {
        user.value = response.data.value
        return true
      } else {
        return false
      }
    } catch (error) {
      await logout()
      return false
    }
  }

  async function checkAdmin(): Promise<boolean | undefined> {
    try {
      if (!user.value?._id) {
        const response = await AuthAPI.refresh()
        if (response.data.value?._id) {
          user.value = response.data.value
        }
      }

      //array.some() проверяет, удовлетворяет ли хотя бы один элемент массива условию
      const hasAdminRole = user?.value?.roles.some(role => role === 'admin');
      return hasAdminRole
    } catch (error) {
      await logout()
      return false
    }
  }
  async function checkManager(): Promise<boolean | undefined> {
    try {
      if (!user.value?._id) {
        const response = await AuthAPI.refresh()
        if (response.data.value?._id) {
          user.value = response.data.value
        }
      }

      //array.some() проверяет, удовлетворяет ли хотя бы один элемент массива условию
      const hasManagerRole = user?.value?.roles.some(role => role === 'manager');
      return hasManagerRole
    } catch (error) {
      await logout()
      return false
    }
  }

  async function logout(): Promise<any> {
    try {
      let res = await AuthAPI.logout()

      user.value = null

      localStorage.removeItem('newUser')
      return res
    } catch { }
  }

  async function updateUser(new_user: any) {
    try {
      user.value = (await AuthAPI.updateUser(new_user)).data
    } catch { }
  }
  async function setManager(user_email: string, chosen_rest: string) {
    try {
      console.log( user_email, chosen_rest)
      user.value = (await AuthAPI.setManager(user_email, chosen_rest)).data
    } catch { }
  }


  async function deleteManager(manager_email: string, restId: string) {
  
    try {
      console.log( manager_email, restId)
      user.value = (await AuthAPI.deleteManager(manager_email, restId)).data
    } catch { }
  }
  /**
   * get user's rests and set it to the user in pinia
   */
  async function getUserRests() {
    try {
      if (user.value?._id) {
        let res = await AuthAPI.getUserRests(user.value?._id)
        user.value.rests = res.data.value.rests
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function chooseManagingRest(restId: string) {
    try {
      let res = await AuthAPI.chooseManagingRest(user.value?._id, restId)
      if (res.status.value == 'success') {
        user.value = res.data.value.user
        managingRestObject.value = res.data.value.rest
      }
      return res
    } catch (error) {
      console.log(error);
    }
  }
  /**
   * делать этот запрос всегда на заход в кабинет менежера
   * @returns 
   */
  async function getManagerIn(): Promise<any> {
    try {
      if (user.value?._id) {
        let restResponse = await RestApi.getById(user.value?.managingRest)
        if (restResponse.status.value == 'success') {
          managingRestObject.value = restResponse.data.value;
        }
        let res = await AuthAPI.getManagerInArray(user.value?._id)
        return res.data.value
      }
      return {}
    } catch (error) {
      console.log(error);
    }
  }

  async function getTemporaryOrder(): Promise<any> {
    try {
      return await AuthAPI.getTemporaryOrder(String(user.value?._id))
    } catch (error) {
      console.log(error);
    }
  }

  async function sendResetLink(email: string): Promise<any> {
    try {
      return await AuthAPI.sendResetLink(email)
    } catch (error) {
      console.log(error);
    }
  }

  async function resetPassword(password: string, userId: string, token: string): Promise<any> {
    try {
      return await AuthAPI.resetPassword(password, userId, token)
    } catch (error) {
      console.log(error);
    }
  }

  return {
    // variables
    user, managingRestObject,
    // functions
    registration, login, redirectTo, checkAuth, checkAdmin, checkManager, logout,
    updateUser, setManager, deleteManager, getUserRests, chooseManagingRest, getManagerIn,
    getTemporaryOrder, sendResetLink, resetPassword
  }
})
