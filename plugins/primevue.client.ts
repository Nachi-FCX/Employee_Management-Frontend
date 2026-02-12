// plugins/primevue.client.ts
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import DatePicker from 'primevue/datepicker'
import Select from 'primevue/select'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    theme: {
      preset: Lara
    }
  })
  
  // Register PrimeVue components globally
  nuxtApp.vueApp.component('DataTable', DataTable)
  nuxtApp.vueApp.component('Column', Column)
  nuxtApp.vueApp.component('Button', Button)
  nuxtApp.vueApp.component('InputText', InputText)
  nuxtApp.vueApp.component('IconField', IconField)
  nuxtApp.vueApp.component('InputIcon', InputIcon)
  nuxtApp.vueApp.component('DatePicker', DatePicker)
  nuxtApp.vueApp.component('Select', Select)
})
