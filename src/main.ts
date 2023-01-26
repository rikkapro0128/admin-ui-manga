import { createApp } from 'vue'
import App from './App.vue'

import dayjs from 'dayjs';
import 'dayjs/locale/vi'

import router from './routes/index';
import store from '@/store/vuex';

import './tailwind/index.css'
import 'element-plus/dist/index.css'

declare module 'vue' {
  interface ComponentCustomProperties {
    $dayjs: typeof dayjs,
  }
}

dayjs.locale('vi') // use locale

const APP_CONTEXT = createApp(App);

APP_CONTEXT.config.globalProperties.$dayjs = dayjs;

APP_CONTEXT.use(store)
APP_CONTEXT.use(router)
APP_CONTEXT.mount('#app')
