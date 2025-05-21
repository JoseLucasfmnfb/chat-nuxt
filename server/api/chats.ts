import { defineEventHandler, getCookie } from 'h3'
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    console.log('getCookie -->>', getCookie(event,'access_token'))
  
    const response = await $fetch(`${config.public.BASE_API_URL}/chats`, {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getCookie(event,'access_token'),
        }
    })
    console.log('response -->>', response)
  
    return { success: true, response }
})