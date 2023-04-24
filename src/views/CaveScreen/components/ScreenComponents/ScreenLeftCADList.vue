<script setup>
import cad01 from '../../../../assets/images/CaveScreenDemo/cad01.png'
import cad02 from '../../../../assets/images/CaveScreenDemo/cad02.png'
import cad03 from '../../../../assets/images/CaveScreenDemo/cad03.png'

const list = [
    {
        id: '01',
        img: cad01
    },
    {
        id: '02',
        img: cad02
    },
    {
        id: '03',
        img: cad03
    }
]
</script>
<template>
    <el-carousel indicator-position="outside" class="screen-layer-carousel">
        <el-carousel-item v-for="item in list" :key="item.id">
            <img :src="item.img" alt="" class="screen-layer-carousel-img">
        </el-carousel-item>
    </el-carousel>
</template>

<style scoped lang="less">
.screen-layer-carousel {
    margin-top: 10px;
    .screen-layer-carousel-img {
        width: 100%;
        height: 100%;
    }
}
</style>