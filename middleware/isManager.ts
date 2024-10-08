export default defineNuxtRouteMiddleware(async (to, from) => {
    let authStore = useAuth()
    let isManager = await authStore.checkManager()
    if (!isManager) {
        abortNavigation();
        return navigateTo('/');
        
    }
})