export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // Initialize user from stored token on app startup
  auth.initializeFromStoredToken()

  const publicRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/landing'
  ]

  if (!auth.loggedIn && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  if (auth.loggedIn && ['/login', '/signup'].includes(to.path)) {
    return navigateTo('/dashboard')
  }
})