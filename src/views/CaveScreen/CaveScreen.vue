<script setup>
import CaveThree from './components/CaveThree/CaveThree.vue'
import Screen from './components/Screen/Screen.vue'
</script>
<template>
	<main class="main-container">
		<CaveThree />
		<Screen />
	</main>
</template>

<style scoped lang="less">
.main-container {
    width: 100vw;
    height: 100vh;
}
.label {
    color: #fff
}
</style>
