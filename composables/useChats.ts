import { useApi } from './useApi'

export function useChats() {
    const { get } = useApi()

    return useAsyncData('chats', () => get('/chats'))
}