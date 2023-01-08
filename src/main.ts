import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PluginIcon from './plugins/vuetify';

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

createApp(App).use(vuetify).mount('#app')
