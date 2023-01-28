<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router'
import HomeAlumnsTabsList from '@/components/HomeAlumnsTabsList.vue'

import { useRoomStore } from "../store/room";

import useSchool from '../composables/useSchool'

const route = useRoute()
const { salon } = route.params;
const { veces } = route.params;
const { searchStatusHours } = useSchool();

const roomStore = useRoomStore()

const tomada = searchStatusHours(salon)
// console.log('tomada: ',tomada[1])
// console.log('tomada2: ',tomada[2]=1)
// console.log('--> ', salon);

// Tabs
let tab = ref('1') //default selected
// console.log(tab.value);
</script>
<template>
  <!-- <div class="text-subtitle-2 ma-1">Lista de asistencia de alumnos materia # semestre # </div> -->
  <v-card>
      <v-tabs v-model="tab" color="ssecondary" align-tabs="end" grow>
        <v-tab :value="n" v-for="n in parseInt(veces)">
           {{ n }}
           <!-- - {{ roomStore.room[salon+'-'+n].status }} -->
          <v-icon :color="roomStore.room[salon+'-'+n].status ? 'green': 'red'">mdi-flag</v-icon>
          <!-- {{ tomada[n] }} -->
        </v-tab>
        <!-- <v-tab value="2">2
          <v-icon>mdi-timer-sync-outline</v-icon>
        </v-tab>
        <v-tab value="3">3
          <v-icon></v-icon>
        </v-tab> -->
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item :value="n" v-for="n in parseInt(veces)">
            <!-- Contenido de la primera hora -->
            <HomeAlumnsTabsList :hora="String(n)" :salon="salon" />
          </v-window-item>

        </v-window>
      </v-card-text>
    </v-card>

</template>
