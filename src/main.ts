import { createApp } from 'vue'
import App from './App.vue'

import router from './routes/index';

import './tailwind/index.css'

import PluginIcon from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // import locale

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  ...PluginIcon,
})

dayjs.locale('zh-cn') // use locale

createApp(App).use(router).use(vuetify).mount('#app')
