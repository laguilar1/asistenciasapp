// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

// export const useDataStore = defineStore('data', {
export const useDataStore = defineStore('data', () => {

  const schools = ref([])

    const loadSchools = (items) => {
      schools.value = items;
    }

    const cleanSchoools = () => {
        schools.value = [];
    }

  return { schools, cleanSchoools, loadSchools}
})
