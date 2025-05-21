<template>
    <div class="chat">
        <InboxSection />
        <ChatPannel/>
    </div>
</template>

<script setup>
    const token = useCookie('access_token').value
    if (!token) {
        navigateTo('/')
    }
</script>

<style lang="scss" scoped>
    .chat{
        display: flex;
        max-width: 100%;
        @media(max-width: 575px){
            flex-direction: column;
        }
    }
</style>