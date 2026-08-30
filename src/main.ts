import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@fontsource-variable/inter/wght.css'
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('A new version is available. Refresh to update.')
  },
  onOfflineReady() {
    console.log('The app is ready to work offline.')
  }
})

const pinia = createPinia()
const app = createApp(App)

const options = {
  position: 'bottom-center',
  autoClose: 2000,
  closeButton: false,
  hideProgressBar: true,
  draggable: false,
  maxToasts: 3,
}

app.use(pinia)
app.use(Toast, options)
app.mount('#app')
