<script setup>
import { reactive, ref } from 'vue'
import { Fold } from '@element-plus/icons-vue'
import eventHub from '../../../../utils/eventHub'

const form = reactive({
	distance: 0,
	organicMatterLayer: {
		C0: 0,
		C1: 0,
		caving: false,
		cavingD: 0,
		cavingType: ''
	},
	leachedLayer: {
		C0: 0,
		C1: 0,
		caving: false,
		cavingD: 0,
		cavingType: ''
	},
	depositionLayer: {
		C0: 0,
		C1: 0,
		caving: false,
		cavingD: 0,
		cavingType: ''
	},
	weatheredLayer: {
		C0: 0,
		C1: 0,
		caving: false,
		cavingD: 0,
		cavingType: ''
	},
	bedrockLayer: {
		C0: 0,
		C1: 0,
		caving: false,
		cavingD: 0,
		cavingType: ''
	}
})

const activeTab = ref('organicMatterLayer')

const handleClick = () => {
	eventHub.emit('imitateCaving', { distance: form.distance, solumData: form[activeTab.value], activeKey: activeTab.value })
}

const handleFold = () => {
	eventHub.emit('hideCavingControl')
}

const tabChange = (name) => {
	console.log(53, name)
}

</script>
<template>
	<div class="controls-form">
		<div class="collapse-btn" @click="handleFold">
			<el-icon :size="20"><Fold /></el-icon>
		</div>
		<el-tabs v-model="activeTab" @tab-click="tabChange">
			<el-tab-pane label="有机质层" name="organicMatterLayer" />
			<el-tab-pane label="淋溶层" name="leachedLayer" />
			<el-tab-pane label="淀积层" name="depositionLayer" />
			<el-tab-pane label="风化层" name="weatheredLayer" />
			<el-tab-pane label="基岩层" name="bedrockLayer" />
		</el-tabs>
		<el-form :model="form" label-width="70px">
			<template v-if="activeTab === 'organicMatterLayer'">
				<el-form-item label="C0">
					<el-input v-model="form.organicMatterLayer.C0" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="C1">
					<el-input v-model="form.organicMatterLayer.C1" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="是否坍塌">
					<el-switch v-model="form.organicMatterLayer.caving" active-text="坍塌" />
				</el-form-item>
				<el-form-item label="坍塌方式">
					<el-radio-group v-model="form.organicMatterLayer.cavingType" class="controls-form-radio">
						<el-radio label="laoding">牢顶</el-radio>
						<el-radio label="luomao">帽落</el-radio>
					</el-radio-group>
				</el-form-item>
			</template>
			<template v-if="activeTab === 'leachedLayer'">
				<el-form-item label="C0">
					<el-input v-model="form.leachedLayer.C0" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="C1">
					<el-input v-model="form.leachedLayer.C1" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="是否坍塌">
					<el-switch v-model="form.leachedLayer.caving" active-text="坍塌" />
				</el-form-item>
				<el-form-item label="坍塌方式">
					<el-radio-group v-model="form.leachedLayer.cavingType" class="controls-form-radio">
						<el-radio label="laoding">牢顶</el-radio>
						<el-radio label="luomao">帽落</el-radio>
					</el-radio-group>
				</el-form-item>
			</template>
			<template v-if="activeTab === 'depositionLayer'">
				<el-form-item label="C0">
					<el-input v-model="form.depositionLayer.C0" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="C1">
					<el-input v-model="form.depositionLayer.C1" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="是否坍塌">
					<el-switch v-model="form.depositionLayer.caving" active-text="坍塌" />
				</el-form-item>
				<el-form-item label="坍塌方式">
					<el-radio-group v-model="form.depositionLayer.cavingType" class="controls-form-radio">
						<el-radio label="laoding">牢顶</el-radio>
						<el-radio label="luomao">帽落</el-radio>
					</el-radio-group>
				</el-form-item>
			</template>
			<template v-if="activeTab === 'weatheredLayer'">
				<el-form-item label="C0">
					<el-input v-model="form.weatheredLayer.C0" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="C1">
					<el-input v-model="form.weatheredLayer.C1" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="是否坍塌">
					<el-switch v-model="form.weatheredLayer.caving" active-text="坍塌" />
				</el-form-item>
				<el-form-item label="坍塌方式">
					<el-radio-group v-model="form.weatheredLayer.cavingType" class="controls-form-radio">
						<el-radio label="laoding">牢顶</el-radio>
						<el-radio label="luomao">帽落</el-radio>
					</el-radio-group>
				</el-form-item>
			</template>
			<template v-if="activeTab === 'bedrockLayer'">
				<el-form-item label="C0">
					<el-input v-model="form.bedrockLayer.C0" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="C1">
					<el-input v-model="form.bedrockLayer.C1" class="controls-form-input" />
				</el-form-item>
				<el-form-item label="是否坍塌">
					<el-switch v-model="form.bedrockLayer.caving" active-text="坍塌" />
				</el-form-item>
				<el-form-item label="坍塌方式">
					<el-radio-group v-model="form.bedrockLayer.cavingType" class="controls-form-radio">
						<el-radio label="laoding">牢顶</el-radio>
						<el-radio label="luomao">帽落</el-radio>
					</el-radio-group>
				</el-form-item>
			</template>
			<el-form-item label="挖掘距离">
				<el-input v-model="form.distance" />
				<el-slider v-model="form.distance" :step="10" show-stops />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" style="width: 100%;" @click="handleClick">模拟</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped lang="less">
.controls-form {
    pointer-events: auto;
    position: absolute;
    left: 0;
    top: 150px;
    width: 450px;
    padding: 30px 16px;
    background-color: #fff;
    border-radius: 5px;
    .collapse-btn {
        position: absolute;
        right: 14px;
        top: 10px;
        &:hover {
            color: #0299e8;
        }
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
