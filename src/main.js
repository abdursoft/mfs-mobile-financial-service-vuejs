import './assets/main.css' 
import 'vue-toast-notification/dist/theme-default.css'; 
import 'vue-tel-input/vue-tel-input.css'; 
import { createApp } from 'vue' 
import { createPinia } from 'pinia' 
import ToastPlugin from 'vue-toast-notification'; 
import VueTelInput from 'vue-tel-input'; 
import { createCustomI18n } from './i18' 
import PrimeVue from 'primevue/config'; 
import Aura from '@primeuix/themes/aura'; 
import App from './App.vue' 
import router from './router' 
import AOS from 'aos' 
import 'aos/dist/aos.css' 
import { definePreset } from '@primeuix/themes';

const MyPreset = definePreset(Aura, { semantic: { colorScheme: { light: { surface: { 0: '#fafafa', 50: '{zinc.50}', 100: '{zinc.100}', 200: '{zinc.200}', 300: '{zinc.300}', 400: '{zinc.400}', 500: '{zinc.500}', 600: '{zinc.600}', 700: '{zinc.700}', 800: '{zinc.800}', 900: '{zinc.900}', 950: '{zinc.950}', }, }, dark: { surface: { 0: '#fefefe', 50: '{slate.50}', 100: '{slate.100}', 200: '{slate.200}', 300: '{slate.300}', 400: '{slate.400}', 500: '{slate.500}', 600: '{slate.600}', 700: '{slate.700}', 800: '{slate.800}', 900: '{slate.900}', 950: '{slate.950}', }, }, }, primary: { 50: '{yellow.50}', 100: '{yellow.100}', 200: '{yellow.200}', 300: '{yellow.300}', 400: '{yellow.400}', 500: '{yellow.500}', 600: '{yellow.600}', 700: '{yellow.700}', 800: '{yellow.800}', 900: '{yellow.900}', 950: '{yellow.950}', }, }, })

// i18n
const i18n = createCustomI18n('EN')

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)
app.use(i18n)
app.use(VueTelInput)

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      prefix: 'dark',
      darkModeSelector: '.myApp',
      cssLayer: false,
    },
  },
  ripple: true,
})

// Initialize AOS *after* app is mounted
app.mount('#app')

AOS.init({
  duration: 800, // animation duration
  once: false,    // animation only happens once
})

// Re-init AOS on route change
router.afterEach(() => {
  AOS.refresh()
})
