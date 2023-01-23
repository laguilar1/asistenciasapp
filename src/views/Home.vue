<script setup>
import HomeSubjectsList from '@/components/HomeSubjectsList.vue'
import BarLoading from '@/components/BarLoading.vue'
import { onMounted } from 'vue'
//Store
import { useUserStore } from "../store/user";
//Composable
import  useSchool  from "../composables/useSchool";

const userStore = useUserStore()
const { loading, fetchSchool } = useSchool()


onMounted(() => {
  fetchSchool();
})


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

