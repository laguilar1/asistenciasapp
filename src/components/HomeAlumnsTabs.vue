<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import HomeAlumnsTabsList from '@/components/HomeAlumnsTabsList.vue'

import { useRoomStore } from "../store/room";
import { useUserStore } from "../store/user";

import useSchool from '../composables/useSchool'
import useStatus from '../composables/useStatus'



const route = useRoute()
const { salon, hora, date:today } = route.params;
const { searchStatusHours } = useSchool();
const { statusColorList } = useStatus();

const roomStore = useRoomStore()
const userStore = useUserStore()

// const today = userStore.user.date
const tomada = searchStatusHours(salon)
const flags = ref(false)
// console.log('tomada: ',tomada[1])
// console.log('tomada2: ',tomada[2]=1)
// console.log('--> ', salon);


// const getStatusNow = (salon, n) => {
//   return roomStore.getStatus(salon, n)
//   setTimeout(() => {
//   }, 100);
// }

// Esto es para que se tarde en mostrar las banderas
// Porque si se ejecuta en seguida al recargar la pagina
// da error de reactividad porque es asincrono el store room
setTimeout(() => {
  flags.value = true
}, 500);



// Tabs
let tab = ref('1') //default selected
// console.log(tab.value);
</script>
<template>
  <!-- <div class="text-subtitle-2 ma-1">Lista de asistencia de alumnos materia # semestre # </div> -->
  <v-card>
      <v-tabs v-model="tab" color="ssecondary" align-tabs="end" grow>
        <v-tab  :color="statusColorList(roomStore.getStatus(salon, hora, today))">

           <!-- - {{ roomStore.room[salon+'-'+n].status }} -->
           <!-- {{ roomStore.getStatus(salon, n, today) }} -->
           <!-- {{ getStatusNow(salon, n, today) }} -->
           <!-- {{ getStatusNow(salon, n, today) }} -->

          <v-icon :color="statusColorList(roomStore.getStatus(salon, hora, today))" v-if="flags" size="x-large">{{'mdi-numeric-'+hora+'-circle-outline'}}</v-icon>
          ª HORA




          <!-- {{ tomada[n] }} -->
        </v-tab>
        <!-- <v-tab value="2">2
          <v-icon>mdi-timer-sync-outline</v-icon>
        </v-tab> -->
         <!--<v-tab value="3">3
          <v-icon></v-icon>
        </v-tab> -->
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item>
            <!-- Contenido de la primera hora -->
            <HomeAlumnsTabsList :hora="String(hora)" :salon="salon" :date="today"/>
          </v-window-item>

        </v-window>
      </v-card-text>
    </v-card>

</template>
