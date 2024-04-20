
import { createApp } from 'vue'
import App from './App.vue'

 
import Border from './components/Border.vue'
import SmallTittle from './components/SmallTittle.vue'

import { createPinia } from 'pinia'
const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.component('Border',Border)
app.component('SmallTittle',SmallTittle)
app.mount('#app')


