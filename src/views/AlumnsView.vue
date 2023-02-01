<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import HomeAlumnsTabs from '@/components/HomeAlumnsTabs.vue'
import { useRoomStore } from "../store/room";
import { useUserStore } from "../store/user";

const route = useRoute()
const roomStore = useRoomStore()
const userStore = useUserStore()

const { salon } = route.params;
const today = userStore.user.date
const display = ref(false)

let plantel = ref("")
let plan = ref("")
let materia = ref("")
let grado = ref("")

setTimeout(() => {
  const id = salon + '-1-' + today
  plan.value = roomStore.room[id].planEstudio
  plantel.value = roomStore.room[id].plantel
  materia.value = roomStore.room[id].materia
  grado.value = roomStore.room[id].grado
}, 500);




</script>

<template>


  <v-container fluid>
    <!-- <p class="text-center text-h6 font-weight-regular mt-2"> {{ plantel }}</p> -->
    <p class="text-center text-h6 font-weight-regular">{{ materia }} {{ grado }} </p>
    <p class="text-center text-subtitle-2 font-weight-regular"> {{ plan }}</p>

    <v-divider></v-divider>
    <!-- From home View -->
    <!-- <HelloWorld /> -->
    <HomeAlumnsTabs/>

  </v-container>
</template>

