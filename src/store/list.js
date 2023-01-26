// Utilities
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useListStore = defineStore('list', () => {

  const list = ref({})

  const getList = () => {
    console.log('Some action list')
  }

  return { list, getList}
})
