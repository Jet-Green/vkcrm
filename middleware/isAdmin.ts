export default defineNuxtRouteMiddleware(async (to, from) => {
    let authStore = useAuth()
    let isAdmin = await authStore.checkAdmin()
    if (!isAdmin) {
        abortNavigation();
        return navigateTo('/');
    }
})