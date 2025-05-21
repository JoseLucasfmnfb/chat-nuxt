<template>
    <div ref="scrollContainer" class="chatSection">
        <ChatMessage />
        <div ref="topAnchor" />
    </div>
</template>

<script setup lang="ts">
    import { ref, nextTick, onMounted, onUpdated } from 'vue'
    import { useChatStore } from '@/stores/chat'

    const chatStore = useChatStore()
    const scrollContainer = ref(null)
    const messagesEnd = ref(null)
    
    const scrollToBottom = () => {
        nextTick(() => {
            if (scrollContainer.value) {
            scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
            }
        })
    }
    onMounted(() => {
        scrollToBottom(false)
    })
    onUpdated(() => {
        scrollToBottom()
    })
    watch(
        () => chatStore.messages.length,
        () => scrollToBottom(),
    )
</script>

<style lang="scss" scoped>
    .chatSection{
        background-color: $color-fill-neutral-low-1;
        flex: 1 1 auto;
        overflow-y: auto;
        padding: 16px;
        scroll-behavior: smooth;
    }
</style>