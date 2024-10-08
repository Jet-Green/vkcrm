import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((nuxtApp) => {
	const vuetify = createVuetify({
		defaults: {
			VBtn: {
				style: 'text-transform: none; letter-spacing: normal',
			},
			global: {
				ripple: false,
			},
		},
		theme: {
			themes: {
			  light: {
				dark: false,
				colors: {
				  primary:  '#FAB232',
				  secondary: '#22B4AF',
				  success:'#54B975',
				  accent:'#D51829',
				 
				}
			  },
			},
		  },
		
	})

	nuxtApp.vueApp.use(vuetify)
})


