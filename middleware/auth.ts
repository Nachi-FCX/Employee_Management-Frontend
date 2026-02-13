export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  /* ---------------------------------
     PUBLIC ROUTES (NO AUTH REQUIRED)
  ---------------------------------- */
  const publicRoutes = [
    '/login',
    '/signup',
    '/forgot-password',
    '/landing',
    '/'
  ]

  /* ---------------------------------
     NOT LOGGED IN → BLOCK ACCESS
  ---------------------------------- */
  if (!auth.loggedIn && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  /* ---------------------------------
     LOGGED IN → BLOCK AUTH PAGES
  ---------------------------------- */
  if (auth.loggedIn && ['/login', '/signup'].includes(to.path)) {
    return navigateTo('/dashboard')
  }
})