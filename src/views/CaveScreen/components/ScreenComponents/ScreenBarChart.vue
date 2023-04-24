<script setup>
import { onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
const initChart = () => {
    const myChart = echarts.init(document.getElementById('inspectionReportChart'))
    const colors = []
    for (let i = 0; i < 6; i++) {
        colors.push({
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
                { offset: 0, color: '#75a6fd' },
                { offset: 0.5, color: '#74a5fd' },
                { offset: 0.5, color: '#6099ff' },
                { offset: 1, color: '#5f98ff' }
            ]
        })
    }
    const option = {
        'title': {
            text: '地下水月平均流量(m³/s)',
            textStyle: {
                color: '#fff'
            }
        },
        'textStyle': {
            'color': '#c0c3cd',
            'fontSize': 14
        },
        'toolbox': {
            'show': false,
            'feature': {
                'saveAsImage': {
                    'backgroundColor': '#031245'
                },
                'restore': {}
            },
            'iconStyle': {
                'borderColor': '#c0c3cd'
            }
        },
        'legend': {
            'top': 10,
            'itemWidth': 8,
            'itemHeight': 8,
            'icon': 'circle',
            'left': 'center',
            'padding': 0,
            'textStyle': {
                'color': '#c0c3cd',
                'fontSize': 14,
                'padding': [2, 0, 0, 0]
            }
        },
        'color': ['#0D5EB1', 'rgba(0, 215, 233, 0.9)'],
        'grid': {
            'containLabel': true,
            'left': 20,
            'right': 20,
            'bottom': 10,
            'top': 40
        },
        'xAxis': {
            'nameTextStyle': {
                'color': '#c0c3cd',
                'padding': [0, 0, -10, 0],
                'fontSize': 14
            },
            'axisLabel': {
                'color': '#c0c3cd',
                'fontSize': 14,
                'interval': 0
            },
            'axisTick': {
                show: false,
                'lineStyle': {
                    'color': '#384267',
                    'width': 1
                }
            },
            'splitLine': {
                'show': false
            },
            'axisLine': {
                'lineStyle': {
                    'color': '#335971'
                },
                'show': true
            },
            'data': ['1月', '2月', '3月', '4月', '5月', '6月'],
            'type': 'category'
        },
        'yAxis': {
            'nameTextStyle': {
                'color': '#c0c3cd',
                'padding': [0, 0, -10, 0],
                'fontSize': 14
            },
            'axisLabel': {
                'color': '#c0c3cd',
                'fontSize': 14
            },
            'axisTick': {
                'lineStyle': {
                    'color': '#668092',
                    'width': 1
                },
                'show': true
            },
            'splitLine': {
                'show': true,
                'lineStyle': {
                    'color': '#335971'
                    // "type": "dashed"
                }
            },
            'axisLine': {
                'lineStyle': {
                    'color': '#668092',
                    'width': 1
                    // "type": "dashed"
                },
                'show': true
            },
            'name': ''
        },
        'series': [
            {
                type: 'bar',
                barWidth: 20,
                itemStyle: {
                    color: function(params) {
                        return colors[params.dataIndex % 7]
                    }
                },
                label: {
                    show: true,
                    color: '#fff',
                    fontSize: 14,
                    position: 'top',
                    offset: [0, -20]
                },
                data: [200, 312, 124, 164, 202, 213]
            },
            {
                z: 3,
                type: 'pictorialBar',
                data: [200, 312, 124, 164, 202, 213],
                symbol: 'diamond',
                symbolOffset: [0, '50%'],
                symbolSize: [20, 20 * 0.5],
                itemStyle: {
                    color: function(params) {
                        return colors[params.dataIndex % 7]
                    }
                }
            },
            {
                z: 4,
                type: 'pictorialBar',
                data: [200, 312, 124, 164, 202, 213],
                symbol: 'diamond',
                symbolPosition: 'end',
                symbolOffset: [0, '-50%'],
                symbolSize: [20, 20 * 0.5],
                itemStyle: {
                    borderWidth: 0,
                    color: 'rgb(79, 141, 253)'
                }
            }
        ],
        'tooltip': {
            'show': true,
            formatter: '数据:{c0}'
        }
    }
    myChart.setOption(option)
}
onMounted(() => {
    initChart()
})
</script>
<template>
    <div class="dialog-sub-title inspection-log-report-title"/>
    <div id="inspectionReportChart" class="chart-container"/>
</template>

<style scoped lang="less">
.chart-container {
    width: 100%;
    height: 290px;
}
</style>
