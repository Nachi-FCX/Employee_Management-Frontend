import { defineNuxtPlugin } from '#app'
import * as persistedStateModule from 'pinia-plugin-persistedstate-2'

export default defineNuxtPlugin((nuxtApp) => {
  const mod: any = persistedStateModule as any
  // prefer default export, fall back to common named exports
  const candidate = mod.default ?? mod.createPersistedState ?? mod.createPersistedStatePlugin ?? mod.piniaPluginPersistedstate ?? mod

  if (!nuxtApp.$pinia) return

  if (typeof candidate === 'function') {
    // try to use it directly, otherwise try calling it (some builds export a factory)
    try {
      nuxtApp.$pinia.use(candidate)
      return
    } catch (e) {
      try {
        nuxtApp.$pinia.use(candidate())
        return
      } catch (err) {
        // fallthrough to warning
      }
    }
  }

  // if it's an object plugin
  if (candidate && typeof candidate === 'object') {
    try {
      nuxtApp.$pinia.use(candidate)
      return
    } catch (e) {
      // ignore and warn below
    }
  }

  // couldn't register plugin cleanly
  // eslint-disable-next-line no-console
  console.warn('[pinia-persisted] could not register persisted state plugin. Module exports:', Object.keys(mod))
})
