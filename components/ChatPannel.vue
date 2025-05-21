<template>
    <div class="chatPannel">
        <HeaderSection />
        <ChatSection />
        <WritingSection />
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
    .chatPannel{
        display: flex;
        flex-direction: column;
        height: 100vh; // ocupa a tela inteira
        max-height: 97vh;
        width: 100%;
    }
</style>