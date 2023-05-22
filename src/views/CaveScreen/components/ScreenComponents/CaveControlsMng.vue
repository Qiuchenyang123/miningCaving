<script setup>
import CaveLayerControls from './CaveLayerControls.vue'
import CaveLayerGroup from './CaveLayerGroup.vue'
import CaveGroupControls from './CaveGroupControls.vue'
import { Fold, Expand } from '@element-plus/icons-vue'
import { useCaveLayerStore } from '../../../../stores/caveLayer'
import { reactive, ref } from 'vue'
import eventHub from '../../../../utils/eventHub'

const source = reactive({
	step: 'layerControl'
})
const caveLayerStore = useCaveLayerStore()
const cavingControlVisible = ref(true)

const handleFold = () => {
	cavingControlVisible.value = false
}

const handleExpand = () => {
	cavingControlVisible.value = true
}

const handleNextStep = (type) => {
	source.step = type
}

const handlePrevStep = (type) => {
	source.step = type
}

const generateModel = () => {

}
</script>
<template>
	<div class="cave-controls-mng" :style="{ right: cavingControlVisible ? 0 : '-485px' }">
		<div class="collapse-btn" @click="handleFold">
			<el-icon :size="20"><Expand /></el-icon>
		</div>
		<div v-show="!cavingControlVisible" class="collapsed-btn" @click="handleExpand">
			<el-icon :size="20"><Fold /></el-icon>
		</div>
		<div v-show="source.step === 'layerControl'">
			<CaveLayerControls @prevStep="handleNextStep('layerGroup')" />
		</div>
		<div v-show="source.step === 'layerGroup'">
			<CaveLayerGroup @nextStep="handleNextStep('groupControl')" @prevStep="handlePrevStep('layerControl')" />
		</div>
		<div v-show="source.step === 'groupControl'">
			<CaveGroupControls @prevStep="handlePrevStep('layerGroup')" />
		</div>
		<!--<el-button type="primary" @click="generateModel">生成模型</el-button>-->
	</div>
</template>

<style scoped lang="less">
.cave-controls-mng {
    z-index: 2;
    position: absolute;
    right: 0;
    top: 150px;
    width: 482px;
    padding: 30px 16px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
    pointer-events: auto;
    transition: right 300ms;
    .collapse-btn {
        position: absolute;
        right: 14px;
        top: 10px;
        &:hover {
            color: #0299e8;
        }
    }
    .collapsed-btn {
        position: absolute;
        left: -30px;
        top: 10px;
        padding: 6px 4px;
        pointer-events: auto;
        background-color: #fff;
        line-height: 14px;
        border-radius: 3px 0 0 3px;
        cursor: pointer;
        &:hover {
            color: #0299e8;
        }
    }
}
</style>
