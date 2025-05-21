<template>
    <div class="chatPannel" :class="chatStore.selectedChatId ? 'active' : ''">
        <HeaderSection />
        <ChatSection />
        <WritingSection />
    </div>
</template>

<script setup>
    import { useChatStore } from '@/stores/chat'
    const chatStore = useChatStore()
</script>

<style lang="scss" scoped>
    .chatPannel{
        display: flex;
        flex-direction: column;
        height: 100vh; // ocupa a tela inteira
        max-height: 97vh;
        width: 100%;
        @media(max-width: 575px){
            position: absolute;
            transform: translateX(-120%);
            transition: all ease .3s;
            background-color: white;
            width: 98%;
            &.active {
                transform: translateX(0vw);
            }
        }
    }
</style>