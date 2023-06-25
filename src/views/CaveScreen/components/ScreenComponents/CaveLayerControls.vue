<script setup>
import { computed, inject, onMounted, reactive, ref } from 'vue'
import eventHub from '../../../../utils/eventHub'
import { Back } from '@element-plus/icons-vue'
import { useCaveLayerStore } from '../../../../stores/caveLayer'

const $message = inject('$message')
const emit = defineEmits(['prevStep'])
const caveLayerStore = useCaveLayerStore()

const form = reactive({
	layerList: caveLayerStore.caveData.caveLayerList
})

const handleClick = () => {
	Object.keys(form.solumMap).forEach(key => {
		const solumData = form.solumMap[key]
		if (solumData.caving && solumData.cavingType === 'laoding') {
			if (!Number(solumData.C0) || !Number(solumData.C1)) {
				$message.error(`${cavingOptionsList.filter(item => item.value === key)[0].label}的C0、C1不能为0`)
				return false
			}
		}
	})
	eventHub.emit('imitateCaving', { distance: form.distance, solumMap: form.solumMap, activeKey: form.cavingLayer })
}

const dChange = (item) => {
	item.e = item.width - 2 * item.d
}

const widthChange = (item) => {
	item.d = (item.width - item.e) / 2
}

const nextStep = () => {
	eventHub.emit('setLayers', form.layerList)
	emit('prevStep')
}

const updateSetting = () => {
	eventHub.emit('setLayers', form.layerList)
}
onMounted(() => {
	eventHub.emit('initLayers', form.layerList)
})

</script>
<template>
	<div class="controls-form">
		<el-scrollbar height="40vh">
			<el-form :model="form" label-width="70px">
				<template v-for="item in form.layerList" :key="`layerKey-${item.code}`">
					<p class="layer-title">岩层：{{ item.groundLayer }}</p>
					<el-form-item label="岩层宽度">
						<el-input-number v-model="item.width" type="number" class="controls-form-input" controls-position="right" @change="widthChange(item)" />
					</el-form-item>
					<el-form-item label="岩层高度">
						<el-input-number v-model="item.height" type="number" class="controls-form-input" controls-position="right" />
					</el-form-item>
					<!--<el-form-item label="C0">
						<el-input v-model="item.C0" type="number" class="controls-form-input" />
					</el-form-item>
					<el-form-item label="C1">
						<el-input v-model="item.C1" type="number" class="controls-form-input" />
					</el-form-item>-->
					<el-form-item label="碎胀率">
						<el-input-number v-model="item.cer" type="number" :step="0.1" class="controls-form-input" controls-position="right" />
					</el-form-item>
					<el-form-item label="倾斜度">
						<el-input-number v-model="item.dr" type="number" :step="0.1" class="controls-form-input" controls-position="right" />
					</el-form-item>
					<el-form-item label="d">
						<el-input-number v-model="item.d" type="number" class="controls-form-input" controls-position="right" @change="dChange(item)" />
					</el-form-item>
					<el-form-item label="e">
						<el-input-number v-model="item.e" :controls="false" disabled type="number" class="controls-form-input" />
					</el-form-item>
					<el-form-item label="偏移高度">
						<el-input-number v-model="item.offsetHeight1" type="number" :step="0.1" class="controls-form-input" controls-position="right" style="width: 100px;" />
						<el-input-number v-model="item.offsetHeight2" type="number" :step="0.1" class="controls-form-input" controls-position="right" style="width: 100px;" />
						<el-input-number v-model="item.offsetHeight3" type="number" :step="0.1" class="controls-form-input" controls-position="right" style="width: 100px;" />
					</el-form-item>
					<el-divider />
				</template>
			</el-form>
		</el-scrollbar>
		<el-button type="primary" @click="nextStep" style="margin-top: 10px;">下一步</el-button>
		<el-button type="primary" @click="updateSetting" style="float: right;margin-top: 10px;">更新配置</el-button>
	</div>
</template>

<style scoped lang="less">
.controls-form {
    pointer-events: auto;
    width: 450px;
    padding: 30px 16px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
    .layer-title {
        padding-bottom: 10px;
    }
    .controls-form-input {
        width: 120px;
        margin-right: 10px;
    }
    .controls-form-radio {
        margin-right: 10px;
    }
}
</style>
