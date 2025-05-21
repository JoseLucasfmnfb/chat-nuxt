<template>
    <div class="loginArea">
        <div class="wrapper">
            <div class="textWrapper">
                <h2>Área de Login</h2>
                <p>Faça login para acessar nosso super-aplicativo</p>
            </div>
            <a :href="loginUrl">
                <BaseButton color="primary" size="full">Fazer login com a Huggy</BaseButton>
            </a>
        </div>
    </div>
</template>

<script setup>
    const config = useRuntimeConfig()

    const loginUrl = `${config.public.AUTH_URL}?` +
    new URLSearchParams({
        scope: 'install_app read_agent_profile', // ajuste conforme necessário
        response_type: 'code',
        redirect_uri: config.public.REDIRECT_URI,
        client_id: config.public.CLIENT_ID,
    }).toString()

</script>

<style lang="scss" scoped>
    .loginArea {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        min-height: 100dvh;
        .wrapper {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 64px;
            .textWrapper {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                h2 {
                    color: $color-text-on-neutral-low-cta;
                    font-size: 26px;
                    font-weight: 400;
                    line-height: 180%;
                    margin: 0;
                }
                p {
                    color: $color-text-on-neutral-low-default;
                    font-size: 16px;
                    font-weight: 400;
                    line-height: 180%;
                    margin: 0;
                }
            }
            a {
                min-width: 238px;
            }
        }
    }
</style>