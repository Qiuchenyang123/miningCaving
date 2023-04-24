<script setup>
import { reactive } from 'vue'
import ListTable from '../../../../components/ListTable.vue'

const data = reactive({
    tableData: [
        {
            id: 1,
            name: '避灾场所1',
            manageUnit: '滨河路1号',
            containNumber: '5000',
            phone: '15372566781'
        },
        {
            id: 2,
            name: '避灾场所2',
            manageUnit: '滨河路1号',
            containNumber: '4500',
            phone: '15372566782'
        },
        {
            id: 3,
            name: '避灾场所3',
            manageUnit: '滨河路1号',
            containNumber: '5500',
            phone: '15372566783'
        },
        {
            id: 4,
            name: '避灾场所4',
            manageUnit: '滨河路1号',
            containNumber: '5000',
            phone: '15372566784'
        },
        {
            id: 5,
            name: '避灾场所5',
            manageUnit: '滨河路1号',
            containNumber: '4500',
            phone: '15372566785'
        },
        {
            id: 6,
            name: '避灾场所6',
            manageUnit: '滨河路1号',
            containNumber: '5000',
            phone: '15372567816'
        },
        {
            id: 7,
            name: '避灾场所7',
            manageUnit: '滨河路1号',
            containNumber: '5000',
            phone: '15372566781'
        },
        {
            id: 8,
            name: '避灾场所8',
            manageUnit: '滨河路1号',
            containNumber: '5000',
            phone: '15372566781'
        },
        {
            id: 9,
            name: '避灾场所9',
            manageUnit: '滨河路1号',
            containNumber: '5000',
            phone: '15372566781'
        },
        {
            id: 10,
            name: '避灾场所10',
            manageUnit: '滨河路1号',
            containNumber: '5000',
            phone: '15372566781'
        }
    ]
})
const columns = [
    {
        id: 'name',
        name: '场所名称',
        width: 120
    },
    {
        id: 'manageUnit',
        name: '管理单位',
        width: 120
    },
    {
        id: 'containNumber',
        name: '收纳人数',
        width: 90
    },
    {
        id: 'phone',
        name: '联系电话',
        width: 120
    }
]
</script>
<template>
    <div class="dialog-content-wrap">
        <!--<div class="dialog-sub-title water-level-change-analyse-title"/>-->
        <ListTable
            :columns="columns"
            :data="data.tableData"
        />
    </div>
</template>

<style scoped lang="less">
.dialog-content-wrap {
    margin-top: 20px;
}
</style>
