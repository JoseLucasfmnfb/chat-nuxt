<template>
    <div class="writing-section">
        <div class="chat-input">
            <!-- Campo de texto -->
            <textarea
                v-model="message"
                placeholder="Digite sua mensagem..."
                rows="2"
                class="text-area"
                @keydown.enter.exact.prevent="emitMessage"
            />
            <!-- Área de anexos -->
            <div v-if="imagePreview || true" class="attachment-area" :class="{ 'has-image': hasImage }">
                <!-- Preview -->
                <div v-if="imagePreview" class="image-preview">
                    <img :src="imagePreview" alt="Imagem anexada" >
                </div>
                <button class="icon-button" @click="toggleImage">
                    <img
                        v-if="hasImage"
                        src="@/assets/icons/remove.svg"
                        alt="Remover imagem"
                    >
                    <img
                        v-else
                        src="@/assets/icons/insert-image.svg"
                        alt="Adicionar imagem"
                    >
                </button>
    
                <!-- Input escondido -->
                <input ref="fileInput" type="file" accept="image/*" hidden @change="handleFileChange" >
            </div>
        </div>
        <BaseButton
            class="send-button"
            color="success"
            size="full"
            @click="emitMessage"
        >
            Enviar
        </BaseButton>
    </div>
</template>
  
<script setup lang="ts">
    const emit = defineEmits(['send'])

    const message = ref('')
    const imagePreview = ref<string | null>(null)
    const fileInput = ref<HTMLInputElement | null>(null)

    const hasImage = computed(() => !!imagePreview.value)

    function emitMessage() {
        if (message.value.trim() === '') return

        emit('send', {
            text: message.value,
            image: imagePreview.value
        })

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
                &.has-image {
                    border-color: $color-border-neutral-1;
                    padding-top: 12px;
                    margin-top: 4px;
                    .icon-button {
                        &:hover {
                            background-color: $color-fill-danger-1;
                            img {
                                color: $color-text-on-neutral-low-danger;
                            }
                        }
                        &:active {
                            background-color: $color-fill-danger-2;
                        }
                    }
                }
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
                        img {
                            color: $color-text-on-neutral-low-cta;
                        }
                    }
                    &:active {
                        background-color: $color-fill-primary-2;
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