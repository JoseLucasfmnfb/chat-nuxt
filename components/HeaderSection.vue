<template>
    <div class="headerSection">
        <img :src="avatar1" alt="avatar" class="avatar" >
        <h2 class="title">Agostinho Carrara</h2>
    </div>
</template>

<script setup>
    import avatar1 from '@/assets/images/agostinho.png'

</script>

<style lang="scss" scoped>
    .headerSection {
        display: flex;
        align-items: center;
        padding: 0 16px;
        height: 64px;
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