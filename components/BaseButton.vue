<template>
    <button :class="classes">
        <slot />
    </button>
</template>

<script setup>
    const props = defineProps({
        color: {
            type: String,
            default: 'primary',
        },
        size: {
            type: String,
            default: 'medium',
        }
    })

    // Classes dinâmicas baseadas nas props
    const classes = computed(() => {
        return [
            'baseBtn',
            `baseBtn--${props.color}`,
            `baseBtn--${props.size}`
        ]
    })
</script>

<style lang="scss" scoped>
    .baseBtn{
        min-width: 98px;
        min-height: 40px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        color: $color-fill-neutral-low-0;
        cursor: pointer;
        transition: all ease .3s;
        &--primary {
            background-color: $color-fill-primary-4;
            border: solid 1px $color-fill-primary-4;
            &:hover{
                background-color: $color-fill-primary-3;
                border: solid 1px $color-fill-primary-3;
            }
            &:active{
                background-color: $color-fill-primary-5;
                border: solid 1px $color-fill-primary-5;
            }
        }
        
        &--success {
            background-color: $color-fill-success-4;
            border: solid 1px $color-fill-success-4;
            &:hover{
                background-color: $color-fill-success-3;
                border: solid 1px $color-fill-success-3;
            }
            &:active{
                background-color: $color-fill-success-5;
                border: solid 1px $color-fill-success-5;
            }
        }

        &--danger {
            background-color: $color-fill-danger-3;
        }

        &--small {
            min-width: 80px;
            height: 32px;
            font-size: 14px;
        }

        &--medium {
            min-width: 98px;
            height: 40px;
        }

        &--full {
            width: 100%;
        }
    }
</style>