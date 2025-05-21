<template>
    <div class="chat">
        <InboxSection />
        <ChatPannel/>
    </div>
</template>

<script setup>
    const response = await useChats()
    console.log('response -->>', response.data)
</script>

<style lang="scss" scoped>
    .chat{
        display: flex;
        max-width: 100%;
    }
</style>