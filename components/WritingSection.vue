<template>
    <div class="writing-section">
        <div class="chat-input">
            <!-- Campo de texto -->
            <textarea
                v-model="message"
                placeholder="Digite sua mensagem..."
                rows="2"
                class="text-area"
                @keydown.enter.exact.prevent="handleEnter"
            />
            <!-- Área de anexos -->
            <div v-if="imagePreview || true" class="attachment-area" :class="{ 'has-image': hasImage }">
                <!-- Preview -->
                <div v-if="imagePreview" class="image-preview">
                    <img :src="imagePreview" alt="Imagem anexada" >
                </div>
                <button class="icon-button" @click="toggleImage">
                    <svg v-if="hasImage" data-v-a71269a3="" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" class="icon">
                        <path fill="#75757B" fill-rule="evenodd" d="M9 1.636a7.364 7.364 0 1 0 0 14.728A7.364 7.364 0 0 0 9 1.636M0 9a9 9 0 1 1 18 0A9 9 0 0 1 0 9m5.967-3.033a.82.82 0 0 1 1.157 0L9 7.843l1.876-1.876a.818.818 0 1 1 1.157 1.157L10.157 9l1.876 1.876a.818.818 0 1 1-1.157 1.157L9 10.157l-1.876 1.876a.818.818 0 0 1-1.157-1.157L7.843 9 5.967 7.124a.82.82 0 0 1 0-1.157" clip-rule="evenodd"/>
                    </svg>
                    <svg v-else data-v-a71269a3="" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" class="icon">
                        <path fill="#75757B" d="M12.5 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                        <path fill="#75757B" d="M0 2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm16 0H2v7.92l3.375-2.7a1 1 0 0 1 1.25 0l4.3 3.44 1.368-1.367a1 1 0 0 1 1.414 0L16 11.586zM2 16h14v-1.586l-3-3-1.293 1.293a1 1 0 0 1-1.332.074L6 9.28l-4 3.2z"/>
                    </svg>
                </button>
    
                <!-- Input escondido -->
                <input ref="fileInput" type="file" accept="image/*" hidden @change="handleFileChange" >
            </div>
        </div>
        <BaseButton
            class="send-button"
            color="success"
            size="full"
            :disabled="!canSend"
            @click="emitMessage"
        >
            Enviar
        </BaseButton>
    </div>
</template>
  
<script setup lang="ts">
    import { useSendMessage } from '@/composables/useMessages'
    import { useChatStore } from '@/stores/chat'
    const chatStore = useChatStore()
    const emit = defineEmits(['sent'])

    const message = ref('')
    const imagePreview = ref<string | null>(null)
    const fileInput = ref<HTMLInputElement | null>(null)

    const hasImage = computed(() => !!imagePreview.value)

    const canSend = computed(() => {
        return message.value.trim() !== '' || !!imagePreview.value
    })

    function handleEnter(event: KeyboardEvent) {
        if (event.shiftKey) {
            // Deixa o Enter funcionar normalmente como nova linha
            return
        }
        // Só envia se canSend for true
        if (canSend.value) {
            emitMessage()
        } else {
            // Evita o Enter de fazer algo se não pode enviar
            event.preventDefault()
        }
    }

    async function reloadMessages() {
        if (!chatStore.selectedChatId) {
            return
        }
        const messages = await useMessages(chatStore.selectedChatId)
        chatStore.setMessages(messages || [])
    }

    async function emitMessage() {
        if (!chatStore.selectedChatId || (!message.value.trim() && !fileInput.value?.files?.[0])) return

        let imageUrl: string | undefined = undefined
        
        if (fileInput.value?.files?.[0]) {
            try {
                imageUrl = await uploadImageToImgur(fileInput.value.files[0])
            } catch (err) {
                console.error('Erro ao fazer upload da imagem:', err)
            }
        }

        const payload = {
            text: message.value,
            file: imageUrl || undefined,
        }

        try {
            const sentMessage = await useSendMessage(chatStore.selectedChatId, payload)
            // Adiciona a nova mensagem no chat atual
            reloadMessages()
        } catch (err) {
            console.error('Erro ao enviar mensagem:', err)
        }    
        message.value = ''
        imagePreview.value = null
    }

    function toggleImage() {
        if (hasImage.value) {
            imagePreview.value = null
        } else {
            fileInput.value?.click()
        }
    }

    function handleFileChange(event: Event) {
        const file = (event.target as HTMLInputElement)?.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                imagePreview.value = e.target?.result as string
            }
            reader.readAsDataURL(file)
        }
    }
</script>
  
<style scoped lang="scss">
    .writing-section{
        display: flex;
        flex-direction: column;
        padding: 16px 24px;
        gap: 8px;
        flex-shrink: 0;
        .chat-input {
            display: flex;
            flex-direction: column;
            border: 1px solid $color-border-neutral-1;
            border-radius: 4px;
            padding: 8px;
            .text-area {
                width: 100%;
                resize: none;
                border: 0;
                padding: 10px;
                font-size: 14px;
                background-color: transparent;
                color: $color-text-on-neutral-low-default;
                &:focus {
                    outline: none;
                    border: none;
                    box-shadow: none;
                }
            }
            .attachment-area {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 10px;
                border-top: 1px solid transparent;
                min-height: 44px;
                .icon-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    padding: 2px 4px;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all ease .3s;
                    min-width: 32px;
                    min-height: 28px;
                    img {
                        width: 18px;
                        height: 18px;
                    }
                    &:hover {
                        background-color: $color-fill-primary-1;
                        .icon {
                            path {
                                fill: $color-text-on-neutral-low-cta;
                            }
                        }
                    }
                    &:active {
                        background-color: $color-fill-primary-2;
                        .icon {
                            path {
                                fill: $color-text-on-neutral-low-cta;
                            }
                        }
                    }
                    .icon {
                        width: 18px;
                        height: 18px;
                        fill: $color-text-on-neutral-low-default;
                    }
                }
                &.has-image {
                    border-color: $color-border-neutral-1;
                    padding-top: 12px;
                    margin-top: 4px;
                    .icon-button {
                        &:hover {
                            background-color: $color-fill-danger-1;
                            .icon {
                                path {
                                    fill: $color-text-on-neutral-low-danger;
                                }
                            }
                        }
                        &:active {
                            background-color: $color-fill-danger-2;
                            .icon {
                                path {
                                    fill: $color-text-on-neutral-low-danger;
                                }
                            }
                        }
                    }
                }
                .image-preview img {
                    width: 81.2px;
                    height: 75.2px;
                    border-radius: 6px;
                    object-fit: cover;
                    border: 1px solid $color-border-neutral-2;
                }
            }
        }
    }
</style>