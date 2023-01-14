// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
   const app = ref({
      // theme: 'light'
   })

  // const changeTheme = (newTheme) => {
  //   app.value.theme = newTheme;
  // }
  return {
    app,
    // changeTheme
  }
})
