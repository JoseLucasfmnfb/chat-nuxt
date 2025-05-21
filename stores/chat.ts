// stores/chat.ts
import { defineStore } from 'pinia'
import { useMessages } from '@/composables/useMessages'

export const useChatStore = defineStore('chat', {
    state: () => ({
        selectedChatId: null as number | null,
        selectedChatCustomer: null as { name: string, photo: string } | null,
        messages: [] as any[],
        loadingMessages: false,
        errorLoadingMessages: null as string | null
    }),
    actions: {
        selectChat(chat: any) {
            this.selectedChatId = chat.id
            this.selectedChatCustomer = {
                id: chat.chatCustomer?.id,
                name: chat.chatCustomer?.name || 'Sem nome',
                photo: chat.chatCustomer?.photo || ''
            }
        },
        setMessages(messages: any[]) {
            const customerId = this.selectedChatCustomer?.id || this.selectedChatId
            this.messages = messages.map(msg => ({
                ...msg,
                isReceivedMsg: msg.receiver?.id === customerId
            }))
        },
    }
})