export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

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