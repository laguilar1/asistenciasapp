<script setup>
import HomeSubjectsList from '@/components/HomeSubjectsList.vue'
// import HomeAlumnsTabs from '@/components/HomeAlumnsTabs.vue'
import { useUserStore } from "../store/user";
const store = useUserStore()

</script>

<template>
  <v-container fluid>

    <!-- From home View -->
    <!-- <HelloWorld /> -->
    <!-- <HomeAlumnsTabs/> -->
    <p class="text-h5 font-weight-regular">¡Hola, {{ store.user.name }}!</p>
    <p class="text-subtitle-2 font-italic font-weight-light">Correo: {{ store.user.email }}</p>
    <v-divider></v-divider>

    <HomeSubjectsList />

  </v-container>
</template>

