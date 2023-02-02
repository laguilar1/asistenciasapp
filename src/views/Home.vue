<script setup>
import HomeSubjectsList from '@/components/HomeSubjectsList.vue'
import ErrorComponent from '@/components/ErrorComponent.vue'
import BarLoading from '@/components/BarLoading.vue'
import { onMounted } from 'vue'
//Store
import { useUserStore } from "../store/user";
//Composable
import  useSchool  from "../composables/useSchool";
import useDate from "../composables/useDate";


const userStore = useUserStore()
const { loading, fetchSchool, errorLoading } = useSchool()
const { ddmmyyyy } = useDate()


onMounted(() => {
  fetchSchool();
})


</script>

<template>
    <v-container fluid >
      <p class="text-center font-weight-bold text-h5 font-weight-regular mt-2">¡Hola, {{ userStore.user.name }}!</p>
      <p class="text-center font-italic font-weight-light">{{ userStore.user.email }} - {{ ddmmyyyy(userStore.user.date) }}</p>
      <v-divider></v-divider>
      <BarLoading v-if="loading" />

      <ErrorComponent v-if="!loading && errorLoading"/>
      <HomeSubjectsList v-if="!loading && !errorLoading" />

    </v-container>

</template>

