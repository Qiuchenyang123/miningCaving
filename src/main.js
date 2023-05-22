import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus, { ElLoading } from 'element-plus'

import 'element-plus/dist/index.css'
import 'leaflet/dist/leaflet.css'
import './assets/style/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.provide('$message', app.config.globalProperties.$message)
app.provide('$confirm', app.config.globalProperties.$confirm)

app.mount('#app')
