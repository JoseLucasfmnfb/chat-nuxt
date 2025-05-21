<template>
    <div class="inboxSection">
        <div class="inboxTittle">
            <h2>Minhas mensagens</h2>
        </div>
        <CardList
            :items="formattedChats"
            :selected-id="selectedChatId"
            @select="handleSelect"
        />
    </div>
</template>

<script setup lang="ts">
    import { useChatStore } from '@/stores/chat'
    import { useChats } from '@/composables/useChats'
    import { useMessages } from '@/composables/useMessages'
    const chatStore = useChatStore()
    const selectedChatId = ref<string | number | null>(null)

    const { data } = await useChats()

    const formattedChats = computed(() => {
        return (data.value || []).map(chat => ({
            id: chat.id,
            avatar: chat.chatCustomer?.photo || '',
            title: chat.chatCustomer?.name || 'Sem nome',
            message: chat.lastMessage?.text || 'Sem mensagem',
            raw: chat
        }))
    })

    async function handleSelect(chat) {
        selectedChatId.value = chat.id
        chatStore.selectChat(chat.raw)
        const messages = await useMessages(chat.id)
        chatStore.setMessages(messages || [])
    }
</script>

<style lang="scss" scoped>
    .inboxSection{
        width: 300px;
        height: stretch;
        border-right: solid 1px $color-fill-neutral-low-2;
        padding: 0 8px 0 8px;
        .inboxTittle{
            border-bottom: solid 1px $color-border-neutral-1;
            padding: 0 16px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            h2{
                color: $color-text-on-neutral-low-cta;
                font-size: 20px;
                font-weight: 500;
                line-height: 180%;
                margin: 0;
            }
        }
    }
</style>