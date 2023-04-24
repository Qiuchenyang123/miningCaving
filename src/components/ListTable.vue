<script setup>
import { reactive } from 'vue'
// import waterLevelSvg from '../assets/images/CaveScreenDemo/water-level-alarm.svg'
// import deviceAlarmSvg from '../assets/images/CaveScreenDemo/device-alarm.svg'

const props = defineProps({
	columns: {
		type: Array,
		default: () => []
	},
	data: {
		type: Array,
		default: () => []
	},
	tableHeight: {
		type: [Number, String],
		default: 280
	}
})

const url = (img) => {
	return new URL(`../../../assets/images/homeView/dialog/${img}.svg`, import.meta.url).href
}

const getImgKey = (key) => {
	const obj = {
		'水位报警': 'waterLevel',
		'设备报警': 'deviceAlarm'
	}
	return obj[key] || 'deviceAlarm'
}

const source = reactive({
	imgObj: {
		// waterLevel: waterLevelSvg,
		// deviceAlarm: deviceAlarmSvg
	}
})

const getWaterLevel = (level) => {
	return ['I级报警', 'II级报警', 'III级报警', 'IV级报警', 'V级报警'][level]
}

const getHeaderCellStyle = () => ({
	padding: '8px 0',
	backgroundColor: 'transparent',
	borderBottom: '1px solid #59697E4D',
	color: '#fff'
})

const getHeaderRowStyle = () => ({
	backgroundColor: 'rgba(255, 255, 255, 0.2)'
})

const getCellStyle = () => ({
	padding: '8px 0',
	backgroundColor: 'transparent',
	borderBottom: '1px solid #59697E4D',
	color: '#fff'
})

const getRowStyle = () => ({
	backgroundColor: 'rgba(255, 255, 255, 0.2)'
})

const getHeaderAlign = (prop) => {
	switch (prop) {
		case 'alarmType':
			return 'center'
		default:
			return 'center'
	}
}
const getAlign = (prop) => {
	switch (prop) {
		case 'alarmType':
			return 'left'
		default:
			return 'center'
	}
}
</script>
<template>
	<div class="list-table-wrap">
		<el-table
			:data="data"
			:header-row-style="getHeaderRowStyle"
			:header-cell-style="getHeaderCellStyle"
			:cell-style="getCellStyle"
			:row-style="getRowStyle"
			:height="tableHeight"
			max-height="50vh"
			size="default"
			style="width: 100%"
			class="list-table"
		>
			<el-table-column v-for="column in columns" :key="column.id" :prop="column.id" :label="column.name" :min-width="column.width || 80" :header-align="getHeaderAlign(column.id)" :align="getAlign(column.id)">
				<template #default="{ row }">
					<span v-if="column.id !== 'alarmType' && column.id !== 'rank'">
						{{ row[column.id] }}
					</span>
					<!--<span v-if="column.id === 'alarmType'">
						<img :src="source.imgObj['waterLevel']" alt="" style="vertical-align: middle;margin-left: 6px">
						<span style="vertical-align: middle">{{ row[column.id] }}</span>
					</span>-->
					<span v-if="column.id === 'rank'">
						{{ getWaterLevel([row[column.id]]) }}
					</span>
				</template>
			</el-table-column>
		</el-table>
	</div>

</template>

<style lang="less">
.list-table-wrap {
  margin-top: 10px;
  .list-table {
    background-color: transparent;
    border-bottom: 1px solid #59697E4D;
    .el-table__inner-wrapper {
      &::before {
        background-color: #59697E4D;
      }
      .el-table__row {
        &:hover {
          background-color: rgba(13, 104, 116, 0.3) !important;
        }
        .cell {
          padding: 0 4px;
        }
      }
    }
  }
}
</style>
