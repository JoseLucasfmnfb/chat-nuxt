import { useApi } from './useApi'

export async function useMessages(chatId: number) {
    const { get } = useApi()
    const resp = await get(`/chats/${chatId}/messages`)
    return resp
}

export async function useSendMessage(chatId: number, payload: { text: string; image?: string }) {
    const { post } = useApi()
    return await post(`/chats/${chatId}/messages`, payload)
}