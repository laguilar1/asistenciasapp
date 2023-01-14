/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

// const myCustomLightTheme = {
//   dark: false,
//   colors: {
//     background: '#FFFFFF',
//     surface: '#FFFFFF',
//     primary: '#6200EE',
//     'primary-darken-1': '#3700B3',
//     secondary: '#03DAC6',
//     'secondary-darken-1': '#018786',
//     error: '#B00020',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FB8C00',
//   }
// }
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      // defaultTheme: 'myCustomLightTheme',
      // defaultTheme: 'dark',
      // themes: {
      //    myCustomLightTheme,
      // }
      light: {
        colors: {
          // primary: '#1867C0',
          primary: '#6200EE',
          secondary: '#CDDC39',

          // primary: colors.red.darken1, // #E53935
          // secondary: colors.red.lighten4, // #FFCDD2
        },
      },
      dark: {
        colors: {
          background: '#333333',
          primary: '#6200EE',
          secondary: '#CDDC39',
        },
      },
    },
  },
})
