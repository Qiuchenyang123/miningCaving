<script setup>
import { onUnmounted, reactive } from 'vue'
import moment from 'moment'
import L from 'leaflet'
import {
    getCors
} from '../../../../utils/crs'
import { onMounted, ref } from 'vue'

const props = defineProps({
    inspectionData: {
        type: Array,
        default: () => []
    },
    inspectionMap: {
        type: Object,
        default: () => ({})
    },
    time: {
        type: String,
        default: moment().format('YYYY-MM-DD HH:mm:ss')
    }
})
const data = reactive({
    title: ''
})
const myMap = ref(null)
const lines = []
let currentIndex = 0
let timer = null
const initMap = () => {
    const center = { lat: 30.677233, lng: 121.015142 }
    const zoom = 11
    myMap.value = L.map('leafletMap', {
        attributionControl: false,
        zoomControl: false,
        crs: getCors('EPSG4490')
    }).setView(center, zoom)
    const layer = L.tileLayer('http://t0.tianditu.gov.cn/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk={tk}', {
        maxZoom: 18,
        minZoom: 1,
        tk: 'ca36544e5225d67c41bd945a27f77d61'
    }).addTo(myMap.value)

    loopChange()
}

const addLines = () => {
    const inspectionMap = props.inspectionMap
    Object.keys(inspectionMap).forEach(key => {
        lines.push(inspectionMap[key].map(item => ({ lat: item.lat, lng: item.lon })))
    })
    const lineGroup = L.layerGroup([]).addTo(myMap.value)
    lines.forEach(line => {
        const layer = L.polyline(line)
        lineGroup.addLayer(layer)
    })
}

const loopChange = () => {
    const keys = Object.keys(props.inspectionMap)
    if (keys.length) {
        if (!lines.length) {
            addLines()
        }
        const currentKey = keys[currentIndex] || []
        const currentLine = lines[currentIndex] || []
        const latArr = currentLine.map(item => item.lat); const lngArr = currentLine.map(item => item.lng)
        const _getAvg = (arr) => {
            let sum = 0
            const len = arr.length
            for (let i = 0; i < len; i++) {
                sum += Number(arr[i])
            }
            return sum / len
        }
        const center = { lng: _getAvg(lngArr), lat: _getAvg(latArr) }
        myMap.value.flyTo(center, 11)
        const currentInspection = props.inspectionData.filter(item => String(item.id) === currentKey)[0]
        data.title = currentInspection.title
        currentIndex = (currentIndex + 1) % lines.length
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            loopChange()
        }, 10000)
    } else {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            loopChange()
        }, 1000)
    }
}

onMounted(() => {
    initMap()
})
onUnmounted(() => {
    if (timer) clearTimeout(timer)
})
</script>
<template>
    <div class="screen-layer-content-wrap">
       <!-- <div class="screen-layer-sub-title patrol-inspection-title">
            <span class="screen-layer-sub-title-time">{{ time }}</span>
        </div>-->
        <div class="screen-layer-video-wrap" style="margin-top: 4px">
            <div class="screen-layer-video-content">
                <p class="screen-layer-video-title">{{ data.title }}</p>
                <div id="leafletMap" class="screen-layer-map-wrap" />
                <!--<img src="@/assets/images/homeView/dialog/patrolInspection-img.png" alt="" class="video-img" style="width: 96%;">-->
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.screen-layer-map-wrap {
    width: 468px;
    height: 250px;
}
</style>
