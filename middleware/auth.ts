export default defineNuxtRouteMiddleware(async (to, from) => {
    let authStore = useAuth()
    let isAuth = await authStore.checkAuth()
    if (!isAuth) {
        abortNavigation();
        return navigateTo('/login')
    }
})