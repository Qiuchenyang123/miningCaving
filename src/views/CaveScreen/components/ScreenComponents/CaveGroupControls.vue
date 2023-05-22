<script setup>
import { computed, inject, reactive } from 'vue'
import eventHub from '../../../../utils/eventHub'
import { useCaveLayerStore } from '../../../../stores/caveLayer'

const $message = inject('$message')
const emit = defineEmits(['prevStep'])
const caveLayerStore = useCaveLayerStore()

const form = reactive({
	distance: 0,
	cavingLayer: '',
	solumMap: {
		organicMatterLayer: {
			C0: 0,
			C1: 0,
			caving: false,
			cavingType: ''
		},
		leachedLayer: {
			C0: 0,
			C1: 0,
			caving: false,
			cavingType: ''
		},
		depositionLayer: {
			C0: 0,
			C1: 0,
			caving: false,
			cavingType: ''
		},
		weatheredLayer: {
			C0: 0,
			C1: 0,
			caving: false,
			cavingType: ''
		},
		bedrockLayer: {
			C0: 0,
			C1: 0,
			caving: false,
			cavingType: ''
		}
	}
})

const caveLayerList = computed(() => caveLayerStore.caveData.caveLayerList)
const caveLayerGroupMap = computed(() => caveLayerStore.caveData.caveLayerGroupMap)
const caveLayerGroupList = computed(() => caveLayerStore.caveData.caveLayerGroupList)

const handlePrev = () => {
	emit('prevStep')
}

const valueChange = (groupKey, index, key, value) => {
	caveLayerStore.updateValueByGroupKey(groupKey, index)
}

const valueDChange = (item, index) => {
	item.e = item.width - 2 * item.d
	caveLayerStore.updateValueByGroupKey(item.groupKey, index)
}

const updateSetting = () => {}
</script>
<template>
	<div class="controls-form">
		<el-scrollbar height="40vh">
			<el-form :model="form" label-width="70px">
				<template v-for="(item, index) in caveLayerGroupList" :key="`groupKey-${item.groupKey}`">
					<p class="layer-title">岩层组合：{{ item.layersName }}</p>
					<el-form-item label="C0">
						<el-input v-model="item.C0" type="number" class="controls-form-input" @change="valueChange(item.groupKey, index, 'CO', Number(item.C0))" />
					</el-form-item>
					<el-form-item label="C1">
						<el-input v-model="item.C1" type="number" class="controls-form-input" @change="valueChange(item.groupKey, index, 'C1', Number(item.C1))" />
					</el-form-item>
					<!--<el-form-item label="d">
						<el-input v-model="item.d" type="number" class="controls-form-input" @change="valueDChange(item, index)" />
					</el-form-item>
					<el-form-item label="e">
						<el-input v-model="item.e" disabled type="number" class="controls-form-input" />
					</el-form-item>
					<el-form-item label="倾斜角度">
						<el-input v-model="item.dr" type="number" :step="0.1" class="controls-form-input" @change="valueChange(item.groupKey, index, 'dr', Number(item.dr))" />
					</el-form-item>-->
					<el-form-item label="坍塌">
						<el-switch v-model="item.caving" active-text="坍塌" @change="valueChange(item.groupKey, index, 'caving', item.caving)" />
					</el-form-item>
					<el-form-item label="坍塌方式">
						<el-radio-group v-model="item.cavingType" class="controls-form-radio" @change="valueChange(item.groupKey, index, 'cavingType', item.cavingType)">
							<el-radio label="laoding">牢顶</el-radio>
							<el-radio label="luomao">帽落</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-divider />
				</template>
			</el-form>
		</el-scrollbar>
		<el-button type="primary" @click="handlePrev" style="margin-top: 10px;">上一步</el-button>
		<el-button type="primary" @click="updateSetting" style="float: right;margin-top: 10px;">更新配置</el-button>
	</div>
</template>

<style scoped lang="less">
.controls-form {
    pointer-events: auto;
    width: 450px;
    padding: 20px 16px;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
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
