<template>
    <div>Processando login...</div>
</template>

<script setup>
    const route = useRoute()
    const code = route.query.code

    if (code) {
        const { data, error } = await useFetch('/api/token', {
            method: 'POST',
            body: { code }
        })

        if (error.value) {
            console.error('Erro ao trocar o código por token:', error.value)
        } else {
            // Redirecionar para home ou chat
            await navigateTo('/chat')
        }
    }
</script>

<style lang="scss" scoped>

</style>