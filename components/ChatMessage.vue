<template>
    <div class="chat-messages">
        <div
            v-for="msg in chatStore.messages"
            :key="msg.id"
            :class="['message-box', msg.isReceivedMsg ? 'sent' : 'received']"
        >
            <div class="content">
                <p class="text">
                    <img v-if="msg.file" :src="msg.file" alt="image" class="image" >
                    {{ msg.text }}
                </p>
                <span class="time">{{ formatTime(msg.sendAt) }}</span>
            </div>
        </div>
    </div>
</template>
  
 <script setup lang="ts">
    import { useChatStore } from '~/stores/chat';
    const { formatTime } = useFormatTime()
    const chatStore = useChatStore()
</script>

<style scoped lang="scss">
    .chat-messages {
        display: flex;
        flex-direction: column-reverse;
        gap: 8px;
        padding: 12px;
    }

    .message-box {
        max-width: 70%;
        padding: 8px 12px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.4;
        display: inline-block;
        position: relative;
        word-break: break-word;

        .text {
            margin: 0;
            padding: 14px 20px;
            border-style: solid;
            border-width: 1px;
            display: flex;
            flex-direction: column;
            .image {
                max-width: 320px;
            }
        }

        .time {
            display: block;
            font-size: 12px;
            font-weight: 400;
            line-height: 180%;
            margin-top: 4px;
            color: $color-text-on-neutral-low-strong;
        }

        &.sent {
            align-self: flex-end;
            .text{
                background-color: $color-fill-primary-3;
                color: $color-text-on-neutral-high-strong;
                border-radius: 6px 6px 2px 6px;
                border-color: $color-fill-primary-3;
            }
            .time {
                text-align: right;
            }
        }

        &.received {
            align-self: flex-start;
            color: $color-text-on-neutral-low-default;
            .text{
                background-color: $color-fill-neutral-low-0;
                color: $color-text-on-neutral-low-strong;
                border-radius: 6px 6px 6px 2px;
                border-color: $color-border-neutral-2;
            }
        }
    }
  </style>