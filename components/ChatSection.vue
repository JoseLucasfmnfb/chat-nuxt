<template>
    <div class="chatSection">
        <ChatMessage :messages="mockMessages"/>
    </div>
</template>

<script setup>
    const mockMessages = [
        {
            id: 1,
            senderType: 'self',
            text: 'Fala mano! Pronto pro treino hoje?',
            time: '14:35'
        },
        {
            id: 2,
            senderType: 'other',
            text: 'Sempre! Hoje o domínio vai ser insano!',
            time: '14:36'
        },
        {
            id: 3,
            senderType: 'self',
            text: 'KKKK quero ver!',
            time: '14:36'
        },
        {
            id: 4,
            senderType: 'other',
            text: 'Traz as cartas de Digimon depois!',
            time: '14:37'
        }
    ]
    console.log('Mensagens mock:', mockMessages)
</script>

<style lang="scss" scoped>
    .chatSection{
        background-color: $color-fill-neutral-low-1;
    }
</style>