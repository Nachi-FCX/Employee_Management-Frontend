// plugins/primevue.client.ts
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Lara
    }
  })
})
