<script setup>
import ScreenStatisticGrid from './ScreenStatisticGrid.vue'
import ScreenListTable from './ScreenListTable.vue'
import ScreenPinChart from './ScreenPinChart.vue'

</script>
<template>
    <div class="screen-left-layer">
        <el-scrollbar height="100%">
            <ScreenStatisticGrid />
            <ScreenListTable />
            <ScreenPinChart />
        </el-scrollbar>
    </div>
</template>

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

.screen-left-layer {
    position: absolute;
    right: 10px;
    top: 120px;
    width: 500px;
    height: calc(100vh - 120px);
    pointer-events: auto;
}
</style>