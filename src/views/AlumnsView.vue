<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import HomeAlumnsTabs from '@/components/HomeAlumnsTabs.vue'
import { useRoomStore } from "../store/room";

const route = useRoute()
const { salon } = route.params;
const roomStore = useRoomStore()
const display = ref(false)

let plantel = ref("")
let plan = ref("")
let materia = ref("")
let grado = ref("")
let fecha = ref("")

setTimeout(() => {
  plan.value = roomStore.room[salon + '-1'].planEstudio
  plantel.value = roomStore.room[salon + '-1'].plantel
  materia.value = roomStore.room[salon + '-1'].materia
  grado.value = roomStore.room[salon + '-1'].grado
  fecha.value = roomStore.getDate(salon)
}, 500);




</script>

<template>


  <v-container fluid>
    <!-- <p class="text-center text-h6 font-weight-regular mt-2"> {{ plantel }}</p> -->
    <p class="text-center text-h6 font-weight-regular">{{ materia }} {{ grado }} </p>
    <p class="text-center text-subtitle-2 font-weight-regular"> {{ fecha }}</p>

    <v-divider></v-divider>
    <!-- From home View -->
    <!-- <HelloWorld /> -->
    <HomeAlumnsTabs/>

  </v-container>
</template>

