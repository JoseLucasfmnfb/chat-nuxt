<template>
    <div v-if="chatStore.selectedChatCustomer" class="headerSection">
        <img :src="chatStore.selectedChatCustomer.photo" alt="avatar" class="avatar" >
        <h2 class="title">{{ chatStore.selectedChatCustomer.name }}</h2>
    </div>
</template>

<script setup>
    const chatStore = useChatStore()
</script>

<style lang="scss" scoped>
    .headerSection {
        display: flex;
        align-items: center;
        padding: 0 16px;
        height: 64px;
        min-height: 64px;
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            object-fit: cover;
            margin-right: 12px;
        }
        .title {
            font-size: 16px;
            font-weight: 500;
            color: $color-text-on-neutral-low-strong;
            line-height: 160%;
        }
    }
</style>