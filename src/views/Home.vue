<script setup>
import HomeSubjectsList from '@/components/HomeSubjectsList.vue'
import BarLoading from '@/components/BarLoading.vue'
import { storeToRefs } from 'pinia';
// import HomeAlumnsTabs from '@/components/HomeAlumnsTabs.vue'
import { useUserStore } from "../store/user";
import { useDataStore } from "../store/data";
import { inject, ref } from 'vue';

const userStore = useUserStore()
const dataStore = useDataStore()
const axios = inject('axios')  // inject axios

const loading = ref(true);
// console.log(axios);
const getList = () => {
  setTimeout(() => {
    console.log("2 Segundo esperado")
    axios
      // .get('https://jsonplaceholder.typicode.com/users')
      .get('https://cenedic4.ucol.mx/newasistencias/index.php/profesores/plantel/3105')
      .then((response) => {
        console.log(response.data.datos)
        dataStore.loadSchools(response.data.datos)
        loading.value = false;
      });

  }, 2000);
};
getList();
// const dataStore = useDataStore()

// // Para no perder la reactividad
// const { hola, schoolsArr } = storeToRefs(dataStore)
// dataStore.loadSchools()
// dataStore.reloadSchools()

</script>

<template>
    <v-container fluid >
      <p class="text-center font-weight-bold text-h5 font-weight-regular mt-2">¡Hola, {{ userStore.user.name }}!</p>
      <p class="text-center font-italic font-weight-light">{{ userStore.user.email }}</p>
      <v-divider></v-divider>
      <BarLoading v-if="loading" />
      <HomeSubjectsList v-else/>
    </v-container>

</template>

