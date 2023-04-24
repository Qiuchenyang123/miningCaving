<script setup>
import { onMounted } from 'vue'
import eventHub from '../../../../utils/eventHub'
import CaveThreeControl from '../../../../three/CaveThreeControl'

let caveThreeControl

eventHub.on('imitateCaving', (form) => {
	caveThreeControl.imitateCaving(form)
})

eventHub.on('startCaving', (form) => {
	caveThreeControl.startCaving(form)
})

eventHub.on('cavingRecover', () => {
	caveThreeControl.cavingRecover()
})

eventHub.on('backHome', () => {
	caveThreeControl.backHome()
})

onMounted(() => {
	caveThreeControl = new CaveThreeControl({
		container: 'main-three-container',
		id: 'three-main-canvas',
		layers: [ // 3.4, 3, 3, 3.5, 3
			{
				code: 'bedrockLayer',
				name: '基岩层',
				prev: 'weatheredLayer',
				next: null,
				height: 5,
				offset: 3.4
			},
			{
				code: 'weatheredLayer',
				name: '风化层',
				prev: 'depositionLayer',
				next: 'bedrockLayer',
				height: 2.5,
				offset: 3
			},
			{
		        code: 'depositionLayer',
				name: '淀积层',
				prev: 'leachedLayer',
				next: 'weatheredLayer',
				height: 3.2,
				offset: 3
			},
			{
				code: 'leachedLayer',
				name: '淋溶层',
				prev: 'organicMatterLayer',
				next: 'depositionLayer',
				height: 2.2,
				offset: 3.5
			},
			{
				code: 'organicMatterLayer',
				name: '有机层',
				prev: null,
				next: 'leachedLayer',
				height: 3.4,
				offset: 3
			}
		], // 3.4, 2.2, 4.2, 1.6, 1.5, 5
		maxWidth: 100
	})
	document.getElementById('main-three-container').appendChild(caveThreeControl.$renderer.domElement)
})
</script>
<template>
	<div id="main-three-container" class="three-container">
		<canvas id="three-main-canvas" />
		<div id="three-css-3d-container" class="three-css-3d-container"/>
	</div>
</template>

<style scoped lang="less">
.three-container {
    overflow: hidden;
    width: 100vw;
    height: 100%;
    .three-css-3d-container {
        display: flex;
        flex-direction: column;
        position: fixed;
        z-index: 100;
        width: 100vw;
        height: 100vh;

        left: 0;
        top: 0;
        pointer-events: none;
    }
}
</style>

<style lang="less">
.three-css-3d-container {
    .elementTag {
        position: relative;
        left: -12px;
        top: 8px;
    }
    .noneEvent {
        pointer-events: none !important;
    }
    .elementTag::before {
        content: "";
        display: block;
        position: absolute;
        width: 100px;
        height: 1px;
        background: rgba(127, 177, 255, 0.75);
        bottom: 0;
        right: -100px;
        transform-origin: 0 0;
        transform: rotate(30deg);
    }
    .elementTag::after {
        content: "";
        display: block;
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(127, 177, 255, 0.75);
        bottom: -65px;
        right: -105px;
        border-radius: 50%;
    }

    .elementContent {
        background-color: rgba(20, 143, 221, 0.68);
        box-shadow: 0 0 12px rgba(0, 128, 254, 0.75);
        border: 1px solid rgba(127, 177, 254, 0.75);
        padding: 3px 20px;

        color: #efefef;
    }

    .elementContent h1 {
        font-size: 20px;
        font-weight: bold;
        margin: 10px 0;
        color: #efefef;
    }
}
</style>
