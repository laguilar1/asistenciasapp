// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

// export const useDataStore = defineStore('data', {
export const useDataStore = defineStore('data', () => {
  // state: () => ({
  //   hola: 'mundo',
  //   schoolsArr: [],
  // }),

    const hola = ref('mundo')
    const schoolsArr = ref([])
    const elementos = ref({
        uno:'example',
        dos: 'example',
    });

    // function loadSchools(items) {
    //   console.log('load schools');
    //   this.schoolsArr = items;
    // }

    // function reloadSchools(items) {
    //   console.log('reload schools');
    //   this.schoolsArr = items;
    // }



    // setCheckList()
    // showSchools()
    // getStatus..


  // const changeTheme = (newTheme) => {
  //   app.value.theme = newTheme;
  // }
  return { hola, schoolsArr, elementos }
})
