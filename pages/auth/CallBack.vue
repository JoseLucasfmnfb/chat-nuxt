<template>
    <div>Processando login...</div>
</template>

<script setup>
    const route = useRoute()

    if (import.meta.client) {
        const code = route.query.code
    
        if (code) {
            const { data, error } = await useFetch('/api/token', {
                method: 'POST',
                body: { code },
                credentials: 'include'
            })
    
            if (error.value) {
                console.error('Erro ao trocar o código por token:', error.value)
            } else {
                if (data.value?.access_token) {
                    localStorage.setItem('access_token', data.value.access_token)
                }
                await navigateTo('/chat')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>