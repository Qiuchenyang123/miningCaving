<script setup>
import { onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
const initPinChart = () => {
    const myChart = echarts.init(document.getElementById('waterQualityClassifyChart'))
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        title: {
            text: '物资类型',
            left: 'center',
            top: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: ['日常物资', '急救物资', '其他物资'],
            bottom: 2,
            width: '100%',
            textStyle: {
                color: '#fff'
            },
            itemWidth: 22,
            itemHeight: 10,
            itemGap: 35
        },
        series: [
            {
                name: '物资类型',
                type: 'pie',
                radius: ['45%', '70%'],
                center: ['50%', '50%'],
                data: [
                    {
                        value: 44,
                        name: '日常物资',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#7f77e8'
                                }, {
                                    offset: 1,
                                    color: '#665ce4'
                                }]),
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        value: 20,
                        name: '急救物资',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#8dffee'
                                }, {
                                    offset: 1,
                                    color: '#54ffd9'
                                }]),
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    {
                        value: 55,
                        name: '其他物资',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#68e3ff'
                                }, {
                                    offset: 1,
                                    color: '#97ecff'
                                }]),
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ].sort(function(a, b) { return a.value - b.value }),
                roseType: 'radius',
                label: {
                    normal: {
                        textStyle: {
                            fontSize: 16,
                            color: 'rgba(255, 255, 255, 1)'
                        },
                        formatter: ({ name, value }) => `${name}:${value}`
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(83, 198, 222, 1)'
                        },
                        smooth: 0.2,
                        length: 18,
                        length2: 20
                    }
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                    return Math.random() * 200
                }
            },
            {
                name: '内环',
                type: 'pie',
                silent: true,
                clockWise: true,
                hoverAnimation: false,
                animationType: 'scale',
                radius: ['40%', '41%'],
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: 100,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(152,251,152,1)'
                            }, {
                                offset: 1,
                                color: 'rgba(64,224,208,1)'
                            }])
                        }
                    }
                }]
            },
            {
                name: '线1',
                type: 'pie',
                silent: true,
                clockWise: true,
                hoverAnimation: false,
                animationType: 'scale',
                radius: ['75%', '75.5%'],
                label: {
                    normal: {
                        position: 'center'
                    }
                },
                data: [{
                    value: 100,
                    itemStyle: {
                        normal: {
                            color: 'rgba(255,255,255,0.3)'
                        }
                    }
                }]
            }
        ]
    }

    myChart.setOption(option)
}
onMounted(() => {
    initPinChart()
})
</script>
<template>
    <div class="dialog-sub-title water-quality-report-title"/>
    <div id="waterQualityClassifyChart" class="pin-chart-container"/>
</template>

<style scoped lang="less">
.pin-chart-container {
    width: 100%;
    height: 290px;
    margin: 10px auto;
}
</style>
