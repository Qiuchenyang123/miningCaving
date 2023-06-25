<script setup>
import { computed, inject, reactive } from 'vue'
import eventHub from '../../../../utils/eventHub'
import { useCaveLayerStore } from '../../../../stores/caveLayer'

const $message = inject('$message')
const caveLayerStore = useCaveLayerStore()

const form = reactive({
	distance: caveLayerStore.caveData.distance,
	cavingLayer: ''
})

const handleClick = () => {
	caveLayerStore.setDistance(form.distance)
	eventHub.emit('imitateCaving')
}
</script>
<template>
	<div class="controls-form">
		<el-scrollbar height="100%">
			<el-form :model="form" label-width="70px">
				<el-form-item label="挖掘层">
					<el-input value="42-16层煤" />
				</el-form-item>
				<el-form-item label="挖掘距离">
					<!--<el-input v-model="form.distance" />-->
					<el-slider v-model="form.distance" :step="10" :max="500" show-stops />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="width: 100%;" @click="handleClick">模拟</el-button>
				</el-form-item>
			</el-form>
		</el-scrollbar>
	</div>
</template>

<style scoped lang="less">
.controls-form {
    position: absolute;
    left: 50%;
    bottom: 10px;
    pointer-events: auto;
    width: 800px;
    height: auto;
    padding: 14px 14px 0;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 5px;
    cursor: pointer;
    transform: translateX(-50%);
    .layer-title {
        padding-bottom: 10px;
    }
    .controls-form-input {
        width: 70px;
        margin-right: 10px;
    }
    .controls-form-radio {
        margin-right: 10px;
    }
}
</style>
