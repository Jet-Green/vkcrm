export default {
  registration(user: any): Promise<any> {
    return useApiFetch('/auth/registration', { method: 'POST', body: user })
  },
  login(email: string, password: string): Promise<any> {
    return useApiFetch('/auth/login', { method: 'POST', body: { email, password } })
  },
  refresh(): Promise<any> {
    return useApiFetch('/auth/refresh', { method: 'GET' })
  },
  logout(): Promise<any> {
    return useApiFetch('/auth/logout', { method: 'POST' })
  },
  updateUser(user: any): Promise<any> {
    return useApiFetch('/auth/update', { method: 'POST', body: { user } })
  },
  setManager(user_email: string, chosen_rest: string): Promise<any> {
    return useApiFetch('/user/set-manager', { method: 'POST', body: { user_email, chosen_rest } })
  },
  deleteManager(manager_email: string, restId: string): Promise<any> {
    return useApiFetch('/user/delete-manager', { method: 'POST', body: { manager_email, restId } })
  },
  /**
   * 
   * @param userId 
   * @returns user's rests
   */
  getUserRests(userId: string): Promise<any> {
    return useApiFetch('/user/rests', {
      method: 'GET',
      query: {
        userId
      }
    })
  },
  chooseManagingRest(userId: string | undefined, restId: string): Promise<any> {
    return useApiFetch('/user/choose-managing-rest', {
      method: 'PATCH',
      body: {
        userId,
        restId
      }
    })
  },
  getManagerInArray(userId: string): Promise<any> {
    return useApiFetch(`/user/manager-in-array?user_id=${userId}`, {
      method: 'GET'
    })
  },
  getTemporaryOrder(userId: string): Promise<any> {
    return useApiFetch(`/user/tmp-order?user_id=${userId}`, {
      method: 'GET'
    })
  },
  getManagingRestObject(userId: string): Promise<any> {
    return useApiFetch(`/user/managing-rest-object?user_id=${userId}`, {
      method: 'GET'
    });
  },
  sendResetLink(email: string) {
    return useApiFetch('/auth/send-reset-link', {
      method: 'POST',
      body: { email }
    })
  },
  resetPassword(password: string, userId: string, token: string) {    
    return useApiFetch('/auth/reset-password', {
      method: 'POST',
      body: { password, userId, token }
    })
  },
}
