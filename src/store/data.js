// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {

  state: () => ({
    hola: 'mundo',
    schoolsArr: [],
  }),

  actions: {

    loadSchools(items) {
      console.log('load schools');
      this.schoolsArr = items;
    },

    reloadSchools(items) {
      console.log('reload schools');
      this.schoolsArr = items;
    },

    clearState() {
      console.log('clear state');
    },

    // async example(login, password) {
    //   try {
    //     this.userData = await api.post({ login, password })
    //     showTooltip(`Welcome back ${this.userData.name}!`)
    //   } catch (error) {
    //     showTooltip(error)
    //     // let the form component display the error
    //     return error
    //   }
    // },


    // setCheckList()
    // showSchools()
    // getStatus..
  }

  // const changeTheme = (newTheme) => {
  //   app.value.theme = newTheme;
  // }

})
