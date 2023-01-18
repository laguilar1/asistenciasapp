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
// import { md3 } from 'vuetify/blueprints'
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
  // blueprint: md3,
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
          primary: '#5F5EA3',
          secondary: '#A3BF42',
          background: '#ECEFF1',

          // primary: colors.red.darken1, // #E53935
          // secondary: colors.red.lighten4, // #FFCDD2
        },
      },
      dark: {
        colors: {
          background: '#444444',
          primary: '#5F5EA3',
          secondary: '#A3BF42',
        },
      },
    },
  },
})
