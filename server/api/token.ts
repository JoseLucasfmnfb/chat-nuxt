import type { H3Event } from 'h3';
import { defineEventHandler, parseCookies, setCookie } from 'h3'
export default defineEventHandler(async (event: H3Event) => {
    const body = await readBody(event)
    const code = body.code
  
    const config = useRuntimeConfig()
  
    const tokenResponse = await $fetch(config.public.TOKEN_ENDPOINT, {
        method: 'POST',
        body: {
            grant_type: 'authorization_code',
            code,
            client_id: config.public.CLIENT_ID,
            client_secret: config.public.CLIENT_SECRET,
            redirect_uri: config.public.REDIRECT_URI
        }
    })
    // Salva o token em um cookie
    setCookie(event, 'access_token', tokenResponse.access_token)
  
    return { success: true }
})