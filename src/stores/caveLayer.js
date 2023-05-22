import { reactive } from 'vue'
import { defineStore } from 'pinia'
import eventHub from '../utils/eventHub'

export const useCaveLayerStore = defineStore('caveLayer', () => {
	const caveData = reactive({
		distance: 20,
		caveLayerList: [
			{
				code: '35_fsy',
				groupKey: '',
				height: 0.5,
				width: 100,
				C0: 5,
				C1: 4,
				cer: 1.2, // 碎胀率
				dr: 0.1, // 倾斜率
				d: 30, // 倾斜率
				e: 40, // 倾斜率
				offsetHeight1: 0,
				offsetHeight2: 1.2,
				offsetHeight3: 0,
				disabled: false,
				caving: false,
				cavingType: '',
				groundLayer: '35-粉砂岩',
				aboveList: []
			},
			{
				code: '36_xsy',
				groupKey: '',
				height: 0.85,
				width: 100,
				C0: 5,
				C1: 4,
				cer: 1.2, // 碎胀率
				dr: 0.1, // 倾斜率
				d: 30, // 倾斜率
				e: 40, // 倾斜率
				offsetHeight1: 0,
				offsetHeight2: 1.2,
				offsetHeight3: 0,
				disabled: false,
				caving: false,
				cavingType: '',
				groundLayer: '36-细砂岩',
				aboveList: ['35_fsy']
			},
			{
				code: '37_ny',
				groupKey: '',
				height: 0,
				width: 100,
				C0: 5,
				C1: 4,
				cer: 1.2, // 碎胀率
				dr: 0.1, // 倾斜率
				d: 30, // 倾斜率
				e: 40, // 倾斜率
				offsetHeight1: 0,
				offsetHeight2: 1.2,
				offsetHeight3: 0,
				disabled: false,
				caving: false,
				cavingType: '',
				groundLayer: '37-泥岩',
				aboveList: ['36_xsy', '35_fsy']
			},
			{
				code: '38_xsy',
				groupKey: '',
				height: 2.4,
				width: 100,
				C0: 5,
				C1: 4,
				cer: 1.2, // 碎胀率
				dr: 0.1, // 倾斜率
				d: 30, // 倾斜率
				e: 40, // 倾斜率
				offsetHeight1: 0,
				offsetHeight2: 1.2,
				offsetHeight3: 0,
				disabled: false,
				caving: false,
				cavingType: '',
				groundLayer: '38-细砂岩',
				aboveList: ['37_ny', '36_xsy', '35_fsy']
			},
			{
				code: '39_fsy',
				groupKey: '',
				height: 1.7,
				width: 100,
				C0: 5,
				C1: 4,
				cer: 1.2, // 碎胀率
				dr: 0.1, // 倾斜率
				d: 30, // 倾斜率
				e: 40, // 倾斜率
				offsetHeight1: 0,
				offsetHeight2: 1.2,
				offsetHeight3: 0,
				disabled: false,
				caving: false,
				cavingType: '',
				groundLayer: '39-粉砂岩',
				aboveList: ['38_xsy', '37_ny', '36_xsy', '35_fsy']
			},
			{
				code: '40_xsy',
				groupKey: '',
				height: 3.5,
				width: 100,
				C0: 5,
				C1: 4,
				cer: 1.2, // 碎胀率
				dr: 0.1, // 倾斜率
				d: 30, // 倾斜率
				e: 40, // 倾斜率
				offsetHeight1: 0,
				offsetHeight2: 1.2,
				offsetHeight3: 0,
				disabled: false,
				caving: false,
				cavingType: '',
				groundLayer: '40-细砂岩',
				aboveList: ['39_fsy', '38_xsy', '37_ny', '36_xsy', '35_fsy']
			},
			{
				code: '41_zsy',
				groupKey: '',
				height: 4.6,
				width: 100,
				C0: 5,
				C1: 4,
				cer: 1.2, // 碎胀率
				dr: 0.1, // 倾斜率
				d: 30, // 倾斜率
				e: 40, // 倾斜率
				offsetHeight1: 0,
				offsetHeight2: 1.2,
				offsetHeight3: 0,
				disabled: false,
				caving: false,
				cavingType: '',
				groundLayer: '41-中砂岩',
				aboveList: ['40_xsy', '39_fsy', '38_xsy', '37_ny', '36_xsy', '35_fsy']
			},
			{
				code: '42_16cm',
				groupKey: '',
				height: 1.8,
				width: 100,
				C0: 5,
				C1: 4,
				cer: 1.2, // 碎胀率
				dr: 0.1, // 倾斜率
				d: 30, // 倾斜率
				e: 40, // 倾斜率
				offsetHeight1: 0,
				offsetHeight2: 1.2,
				offsetHeight3: 0,
				disabled: false,
				caving: false,
				cavingType: '',
				groundLayer: '42-16层煤',
				aboveList: ['41_zsy', '40_xsy', '39_fsy', '38_xsy', '37_ny', '36_xsy', '35_fsy']
			}
		],
		caveLayerGroupMap: {},
		caveLayerGroupList: []
	})
	const setCaveLayerList = (list) => {
		caveData.caveLayerList = list
	}
	const setCaveLayerGroupMap = (map) => {
		caveData.caveLayerGroupMap = map
	}
	const setCombinationByCodeList = (codeList) => {
		const mapKey = Date.now()
		caveData.caveLayerGroupMap[mapKey] = []
		codeList.forEach(item => {
			const index = caveData.caveLayerList.findIndex(obj => obj.code === item)
			caveData.caveLayerList[index].disabled = true
			caveData.caveLayerList[index].groupKey = mapKey
			caveData.caveLayerGroupMap[mapKey].push(caveData.caveLayerList[index])
		})
	}
	const initCaveLayerGroupList = () => {
		caveData.caveLayerGroupList = Object.keys(caveData.caveLayerGroupMap).map(key => ({
			caving: false,
			cavingType: '',
			// width: 30,
			C0: 5,
			C1: 4,
			// d: 0, //
			// e: 0, //
			groupKey: key,
			layersName: caveData.caveLayerGroupMap[key].map(item => item.groundLayer).join(',')
		}))
	}

	const updateValueByGroupKey = (groupKey, index) => {
		// const keys = ['C0', 'C1', 'd', 'e', 'dr', 'caving', 'cavingType']
		caveData.caveLayerList.forEach(item => {
			 if (String(item.groupKey) === groupKey) {
			 	Object.assign(item, caveData.caveLayerGroupList[index])
			}
		})
		eventHub.emit('setLayers', caveData.caveLayerList)
	}
	const setDistance = (d) => {
		caveData.distance = d
	}
	return {
		caveData,
		setCaveLayerList,
		setCaveLayerGroupMap,
		setCombinationByCodeList,
		initCaveLayerGroupList,
		updateValueByGroupKey,
		setDistance
	}
})
