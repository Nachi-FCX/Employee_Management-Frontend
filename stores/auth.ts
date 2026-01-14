import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRuntimeConfig, navigateTo } from '#imports'

interface User {
    username: string
    role: string | null
}

function parseJwt(token: string) {
    try {
        const payload = token.split('.')[1]
        // base64url -> base64
        const b64 = payload.replace(/-/g, '+').replace(/_/g, '/')
        const json = decodeURIComponent(
            atob(b64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )
        return JSON.parse(json)
    } catch (e) {
        return null
    }
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)

    const loggedIn = computed(() => !!token.value)
    const role = computed(() => user.value?.role || null)

    async function login(username: string, password: string) {
        try {
            const config = useRuntimeConfig()
            const apiBase = config.public?.apiBase || ''

            const url = `${apiBase}/api/auth/login`
            // debug: show the request URL
            // eslint-disable-next-line no-console
            console.debug('[auth] POST', url)

            const res = await $fetch(url, {
                method: 'POST',
                body: { username, password }
            }) as { token?: string, message?: string }

            console.debug('[auth] response', { ok: !!res?.token, message: res?.message })

            if (!res || !res.token) {
                throw new Error(res?.message || 'Invalid credentials')
            }

            token.value = res.token

            // try to extract role / info from JWT payload
            const payload = parseJwt(res.token)
            const roleValue = payload?.roleId ?? payload?.role ?? null

            user.value = { username, role: roleValue ? String(roleValue) : null }

            if (process.client) {
                await navigateTo('/dashboard')
            }
        } catch (err: any) {
            // rethrow a readable error
            throw new Error(err?.message || 'Login failed')
        }
    }

    function logout() {
        user.value = null
        token.value = null
        navigateTo('/login')
            
        // leave navigation to pages/components
    }

    return {
        user,
        token,
        loggedIn,
        role,
        login,
        logout,
    }
}, {
    persist: true
})