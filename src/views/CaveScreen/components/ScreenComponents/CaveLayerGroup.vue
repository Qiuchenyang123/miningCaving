<script setup>
import { computed, inject, reactive } from 'vue'
import { useCaveLayerStore } from '../../../../stores/caveLayer'

const emit = defineEmits(['nextStep'])
const $message = inject('$message')
const caveLayerStore = useCaveLayerStore()

const source = reactive({
	checkList: []
})

const layerList = computed(() => caveLayerStore.caveData.caveLayerList.filter(layer => layer.code !== '42_16cm'))
const groupMap = computed(() => caveLayerStore.caveData.caveLayerGroupMap)

const actions = {
	handleCombination() {
	    const data = [...source.checkList]
		caveLayerStore.setCombinationByCodeList(data)
		source.checkList = []
		const enableList = layerList.value.filter(item => !item.disabled)
		if (!enableList.length) {
			caveLayerStore.initCaveLayerGroupList()
		}
		/* const mapKey = Date.now()
		source.groupMap[mapKey] = []
		data.forEach(item => {
			const index = source.layerList.findIndex(obj => obj.code === item)
			source.layerList[index].disabled = true
			source.layerList[index].groupKey = mapKey
			source.groupMap[mapKey].push(source.layerList[index])
		})
		source.checkList = []*/
	},
	resetCombination() {
		layerList.value.forEach(item => {
	        item.disabled = false
		})
		source.checkList = []
		caveLayerStore.setCaveLayerGroupMap({})
	},
	prevStep() {
		emit('prevStep')
	},
	nextStep() {
		const enableList = layerList.value.filter(item => !item.disabled)
		if (enableList.length) {
			$message.error('请为所有的岩层配置组合')
			return false
		}
		emit('nextStep')
	}
}
</script>
<template>
	<div class="cave-layer-group">
		<div class="step-title">配置组合</div>
		<el-button type="primary" @click="actions.handleCombination" style="margin-bottom: 10px;">组合</el-button>
		<el-button type="default" @click="actions.resetCombination" style="margin-bottom: 10px;">重置</el-button>
		<el-scrollbar height="40vh">
			<el-row class="cave-layer-group">
				<el-col :span="10">
					<div class="group-layer-list">
						<div class="group-layer-title">岩层</div>
						<el-checkbox-group v-model="source.checkList">
							<el-checkbox v-for="item in layerList" :key="item.groundLayer" :label="item.code" :disabled="item.disabled">{{ item.groundLayer }}</el-checkbox>
						</el-checkbox-group>
					</div>
				</el-col>
				<el-col :span="14">
					<div class="group-layer-title">岩层组合</div>
					<div v-for="(value, key) in groupMap" :key="key" class="layer-group">
						<div v-for="item in value" :key="value.code" class="layer-group-item">{{ item.groundLayer }}</div>
					</div>
				</el-col>
			</el-row>
		</el-scrollbar>
		<el-button type="primary" @click="actions.prevStep" style="float: left;margin-top: 10px;">上一步</el-button>
		<el-button type="primary" @click="actions.nextStep" style="float: right;margin-top: 10px;">下一步</el-button>
	</div>
</template>

<style scoped lang="less">
.cave-layer-group {
    .step-title {
        margin-bottom: 10px;
        font: 600 18px 'PingFang SC-Semibold, PingFang SC';
    }
    .cave-layer-group {
        .group-layer-title {
            padding-left: 20px;
        }
        .layer-group {
            border: 1px solid #dedede;
            border-radius: 4px;
            & + .layer-group {
                margin-top: 5px;
            }
            .layer-group-item {
                margin: 5px;
            }
        }
    }
}

</style>
