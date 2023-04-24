<template>
    <div class="screen-layer-wrap" :class="{ 'screen-left-layer-wrap': position === 'left', 'screen-right-layer-wrap': position === 'right' }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'ScreenLayerWrap',
    props: {
        position: {
            type: 'String',
            default: 'left'
        }
    }
}
</script>

<style scoped lang="less">
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
    left: -100%;
}
.slideRight-enter-active,
.slideRight-leave-active {
    transition: all 0.5s ease;
}

.slideRight-enter-from,
.slideRight-leave-to {
    right: -100%;
}

.screen-layer-wrap {
    position: absolute;
    width: 500px;

    &.screen-left-layer-wrap {
        left: 10px;
        top: 100px;
    }
}
</style>