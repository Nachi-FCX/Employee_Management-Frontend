// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt','@nuxt/ui'],
    // modules: ['],
  css: ['~/assets/styles/main.scss','~/assets/styles/main.css'],
  
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
