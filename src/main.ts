import { createApp } from 'vue'
import App from './App.vue'

import router from './routes/index';

import './tailwind/index.css'

// dayjs.locale('zh-cn') // use locale

const APP_CONTEXT = createApp(App);

// APP_CONTEXT.config.globalProperties.$dayjs = dayjs;

APP_CONTEXT.use(router)
APP_CONTEXT.mount('#app')
