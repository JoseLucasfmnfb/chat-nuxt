import type { H3Event } from 'h3';
import { defineEventHandler, setCookie } from 'h3'
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
        },
        credentials: 'include'
    })
    // Salva o token em um cookie
    setCookie(event, 'access_token', tokenResponse.access_token, {
        httpOnly: false, // 👈 permite leitura no client
        path: '/',
        secure: false,   // se estiver em localhost
        maxAge: 60 * 60 * 24
      })
  
    return { success: true, access_token: tokenResponse.access_token}
})