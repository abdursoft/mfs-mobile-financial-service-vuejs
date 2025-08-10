import './assets/main.css'
import 'vue-toast-notification/dist/theme-default.css';
import 'vue-tel-input/vue-tel-input.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';
import VueTelInput from 'vue-tel-input';

import App from './App.vue'
import router from './router'


const globalOptions = {
  mode: 'auto',
};

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.use(VueTelInput,globalOptions)

app.mount('#app')
