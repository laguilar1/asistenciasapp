<script setup>
import HomeSubjectsList from '@/components/HomeSubjectsList.vue'
import { storeToRefs } from 'pinia';
// import HomeAlumnsTabs from '@/components/HomeAlumnsTabs.vue'
import { useUserStore } from "../store/user";
import { useDataStore } from "../store/data";
import { inject } from 'vue'

const userStore = useUserStore()
const axios = inject('axios')  // inject axios

// console.log(axios);
const getList = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      console.log(response.data)
    });
};
// getList();
// const dataStore = useDataStore()

// // Para no perder la reactividad
// const { hola, schoolsArr } = storeToRefs(dataStore)
// dataStore.loadSchools()
// dataStore.reloadSchools()

</script>

<template>
  <v-container fluid>

    <!-- From home View -->
    <!-- <HelloWorld /> -->
    <!-- <HomeAlumnsTabs/> -->
    <p class="text-center text-h6 font-weight-regular mt-2">¡Hola, {{ userStore.user.name }}!</p>
    <p class="text-center text-subtitle-1 font-weight-regular">Correo: {{ userStore.user.email }}</p>
    <v-divider></v-divider>

    <HomeSubjectsList />

  </v-container>
</template>

