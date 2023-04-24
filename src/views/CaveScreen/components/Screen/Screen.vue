<script setup>
import ScreenHeader from '../ScreenComponents/ScreenHeader.vue'
import MenuBtn from '../ScreenComponents/MenuBtn.vue'
// import ScreenLeftLayer from '../ScreenComponents/ScreenLeftLayer.vue'
// import ScreenRightLayer from '../ScreenComponents/ScreenRightLayer.vue'
import CaveControls from '../ScreenComponents/CaveControls.vue'
import { Expand } from '@element-plus/icons-vue'
import eventHub from '../../../../utils/eventHub'
import { reactive } from 'vue'

const data = reactive({
	controlsVisible: false
})

eventHub.on('showCavingControl', () => {
	data.controlsVisible = true
})

eventHub.on('hideCavingControl', () => {
	data.controlsVisible = false
})

const handleExpand = () => {
	data.controlsVisible = true
}
/* eventHub.on('showDetail', () => {
	data.leftLayerVisible = false
	data.rightLayerVisible = false
})

eventHub.on('backHome', () => {
	data.leftLayerVisible = true
	data.rightLayerVisible = true
})*/

</script>
<template>
	<div class="screen-wrap">
		<ScreenHeader />
		<Transition name="slide" mode="out-in">
			<CaveControls v-if="data.controlsVisible" />
			<div v-else class="collapse-btn" @click="handleExpand"><el-icon :size="20"><Expand /></el-icon></div>
		</Transition>
		<!--<div v-show="!data.controlsVisible" class="collapse-btn" @click="handleExpand"><el-icon><Expand /></el-icon></div>-->
		<!--<Transition name="slideRight" mode="out-in">
			<ScreenRightLayer v-if="data.rightLayerVisible" />
		</Transition>-->
		<!--<CaveControls />-->
		<MenuBtn />
	</div>
</template>

<style scoped lang="less">
.screen-wrap {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    .collapse-btn {
        pointer-events: auto;
        color: #fff;
        &:hover {
            color: #0299e8;
        }
    }
}
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
    transition: all 1s ease;
}

.slideRight-enter-from,
.slideRight-leave-to {
    right: -100%;
}
</style>
