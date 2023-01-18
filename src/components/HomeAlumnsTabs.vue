<script setup>
import { ref} from 'vue';
import HomeAlumnsTabsList from '@/components/HomeAlumnsTabsList.vue'



// Tabs
let tab = ref('1')
console.log(tab.value);
</script>
<template>
  <!-- <div class="text-subtitle-2 ma-1">Lista de asistencia de alumnos materia # semestre # </div> -->
  <v-card>
      <v-tabs v-model="tab" color="ssecondary" align-tabs="end" grow>
        <v-tab value="1">1
          <v-icon>mdi-timer-check-outline</v-icon>
        </v-tab>
        <v-tab value="2">2
          <v-icon>mdi-timer-sync-outline</v-icon>
        </v-tab>
        <v-tab value="3">3
          <v-icon></v-icon>
        </v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="1">
            <!-- Contenido de la primera hora -->
            <HomeAlumnsTabsList hora="1a" />
          </v-window-item>

          <v-window-item value="2">
            <!-- Contenido de la segunda hora -->
            <HomeAlumnsTabsList hora="2a" />
          </v-window-item>

          <v-window-item value="3">
            <!-- Contenido de la tercera hora -->
            <HomeAlumnsTabsList hora="3a" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>

</template>
