<template>
    <div class="inboxSection">
        <div class="inboxTittle">
            <h2>Minhas mensagens</h2>
        </div>
        <CardList :items="mockData"/>
    </div>
</template>

<script setup>
    import avatar1 from '@/assets/images/agostinho.png'
    import avatar2 from '@/assets/images/beicola.png'
    import avatar3 from '@/assets/images/lineu.png'
    const mockData = [
        {
            id: 1,
            avatar: avatar1,
            title: 'Agostinho Carrara',
            message: '199,99'
        },
        {
            id: 2,
            avatar: avatar2,
            title: 'Beiçola',
            message: 'precisamos ver dos fiado, tem muita coisa sem pagar'
        },
        {
            id: 3,
            avatar: avatar3,
            title: 'Lineu Silva',
            message: 'Sobre a inspeção do outro dia'
        }
    ]

</script>

<style lang="scss" scoped>
    .inboxSection{
        width: 300px;
        height: stretch;
        border-right: solid 1px $color-fill-neutral-low-2;
        padding: 0 8px 0 8px;
        .inboxTittle{
            border-bottom: solid 1px $color-border-neutral-1;
            padding: 0 16px 14px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: center;
            h2{
                color: $color-text-on-neutral-low-cta;
                font-size: 20px;
                font-weight: 500;
                line-height: 180%;
                margin: 0;
            }
        }
    }
</style>