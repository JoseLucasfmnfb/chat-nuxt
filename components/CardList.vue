<template>
    <div class="card-list">
        <div
            v-for="item in items"
            :key="item.id"
            class="card"
            :class="{ selected: item.id === selectedId }"
            @click="$emit('select', item)"
        >
            <img :src="item.avatar" alt="avatar" class="avatar" >
            <div class="info">
                <strong class="title">{{ item.title }}</strong>
                <p class="message">{{ item.message }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
        items: {
            id: string | number
            avatar: string
            title: string
            message: string
        }[]
        selectedId: string | number | null
    }>()
</script>

<style scoped lang="scss">
    .card-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px 0;
    }

    .card {
        display: flex;
        align-items: center;
        background-color: $color-fill-neutral-low-0;
        border-radius: 4px;
        padding: 0px 8px;
        transition: all ease .3s;
        min-height: 86px;
        cursor: pointer;
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            object-fit: cover;
            margin-right: 12px;
        }
        .info {
            .title {
                font-size: 16px;
                font-weight: 500;
                color: $color-text-on-neutral-low-strong;
                line-height: 160%;
            }

            .message {
                font-size: 14px;
                font-weight: 400;
                line-height: 180%;
                color: $color-text-on-neutral-low-default;
                margin: 0;
                text-overflow: ellipsis;
                max-width: 200px;
                white-space: nowrap;
                overflow: hidden;
            }
        }
        &.selected {
            background-color: $color-fill-primary-0;
            .info {
                .title {
                    color: $color-text-on-neutral-low-cta;
                }
            }
        }
        &.active {
            background-color: $color-fill-primary-1;
        }
        &:hover {
            background-color: $color-fill-primary-0;
        }
    }
</style>