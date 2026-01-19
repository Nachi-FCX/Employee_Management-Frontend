// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt'],
  css: ['~/assets/styles/main.scss'],
  imports: {
    dirs: ['stores']
  },
  components: [{ path: '~/components', pathPrefix: false }],
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:4000'
    }
  }
})
