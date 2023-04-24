<script setup>
import { reactive } from 'vue'
import N from '../../../../assets/images/CaveScreenDemo/statistic/N.svg'
import P from '../../../../assets/images/CaveScreenDemo/statistic/P.svg'
import suspendedSolids from '../../../../assets/images/CaveScreenDemo/statistic/suspendedSolids.svg'
import PH from '../../../../assets/images/CaveScreenDemo/statistic/PH.svg'
import inscription from '../../../../assets/images/CaveScreenDemo/statistic/inscription.svg'
import oxygenContent from '../../../../assets/images/CaveScreenDemo/statistic/oxygenContent.svg'
const data = reactive({
    statisticData: [
        {
            id: 'totalN',
            name: '交通障碍',
            icon: N,
            value: 1
        },
        {
            id: 'totalP',
            name: '落石',
            icon: P,
            value: 0
        },
        {
            id: 'suspendedSolids',
            name: '山体滑坡',
            icon: suspendedSolids,
            value: 1
        },
        {
            id: 'PH',
            name: '泥石流',
            icon: PH,
            value: 0
        },
        {
            id: 'inscription',
            name: '决口风险',
            icon: inscription,
            value: 0
        },
        {
            id: 'oxygenContent',
            name: '湖',
            icon: oxygenContent,
            value: 0
        }
    ]
})
</script>
<template>
    <div class="water-quality-statistic-wrap">
        <div v-for="item in data.statisticData" :key="item.id" class="statistic-item">
            <img :src="item.icon" alt="" class="statistic-img">
            <p class="statistic-name">{{ item.name }}</p>
            <p class="statistic-number">{{ item.value }} <span style="color: #fff;font-size: 14px">处</span></p>
        </div>
    </div>
</template>

<style scoped lang="less">
.water-quality-statistic-wrap {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 30px 0;
    background: url("../../../../assets/images/CaveScreenDemo/video-bg.png") no-repeat center center / 100% 100%;
    .statistic-item {
        width: 162px;
        height: 110px;
        padding-left: 25px;
        box-sizing: border-box;
        .statistic-img {
            float: left;
            margin: 14px auto 6px;
        }
        .statistic-number {
            padding: 0 16px;
            color: #00EAFD;
            font: 500 22px 'Futura-Medium, Futura';
        }
        .statistic-name {
            padding: 16px 16px 0;
            color: #fff;
            font: 500 14px 'FZZZHONGJW--GB1-0, FZZZHONGJW--GB1';
        }
    }
}
.chart-wrap {
    width: 100%;
    height: 180px;
    .chartContent {
        width: 100%;
        height: 100%;
    }
}
</style>
