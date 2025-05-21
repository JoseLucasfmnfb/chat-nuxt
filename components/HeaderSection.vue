<template>
    <div v-if="chatStore.selectedChatCustomer" class="headerSection">
        <div class="textWrapper">
            <img :src="chatStore.selectedChatCustomer.photo" alt="avatar" class="avatar" >
            <h2 class="title">{{ chatStore.selectedChatCustomer.name }}</h2>
        </div>
        <button v-if="isMobile" class="closeMenuMobileButton" @click="closeMobileChat">
            <svg data-v-a71269a3="" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" class="icon">
                <path fill="#75757B" fill-rule="evenodd" d="M9 1.636a7.364 7.364 0 1 0 0 14.728A7.364 7.364 0 0 0 9 1.636M0 9a9 9 0 1 1 18 0A9 9 0 0 1 0 9m5.967-3.033a.82.82 0 0 1 1.157 0L9 7.843l1.876-1.876a.818.818 0 1 1 1.157 1.157L10.157 9l1.876 1.876a.818.818 0 1 1-1.157 1.157L9 10.157l-1.876 1.876a.818.818 0 0 1-1.157-1.157L7.843 9 5.967 7.124a.82.82 0 0 1 0-1.157" clip-rule="evenodd"/>
            </svg>
        </button>
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useWindowSize } from '@vueuse/core'
    const chatStore = useChatStore()
    function closeMobileChat(){
        chatStore.selectedChatId = null
    }

    const { width } = useWindowSize()

    const isMobile = computed(() => width.value < 575)
</script>

<style lang="scss" scoped>
    .headerSection {
        display: flex;
        align-items: center;
        padding: 0 16px;
        height: 64px;
        min-height: 64px;
        .textWrapper{
            display: flex;
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
        .closeMenuMobileButton {
            width: 30px;
            height: 30px;
            padding: 0;
            background-color: transparent;
            border: none;
            cursor: pointer;
            svg{
                width: 25px;
                height: 25px;
            }
        }
        @media(max-width: 575px){
            justify-content: space-between;
        }
    }
</style>