
import { createApp } from 'vue'
import App from './App.vue'

 
import Border from '@/components/MainWindow/Public/Border.vue'
import SmallTittle from '@/components/MainWindow/Public/SmallTittle.vue'

import { createPinia } from 'pinia'
import router from './router'


const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.component('Border',Border)
app.component('SmallTittle',SmallTittle)
app.mount('#app')


