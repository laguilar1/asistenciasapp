<script setup>
import { ref, computed } from 'vue';
import { useOnline } from '@vueuse/core'

import useStatus from '../composables/useStatus'
const { statusIcon, statusColor, statusText, statusNext } = useStatus();

const online = useOnline()
const props = defineProps({
  hora: {
    type: String,
    required: true
  },
})

  const alumns = ref([
    {
      id:1,
      status: '1',
      color: 'blue',
      icon: 'mdi-clipboard-text',
      // subtitle: 'Jan 20, 2014',
      title: 'Nombre del Alumno 1',
    },
    {
      id:2,
      status: '2',
      color: 'amber',
      icon: 'mdi-gesture-tap-button',
      // subtitle: 'Jan 10, 2014',
      title: 'Nombre del alumno 2',
    },
    {
      id:3,
      status: '3',
      color: 'amber',
      icon: 'mdi-gesture-tap-button',
      // subtitle: 'Jan 10, 2014',
      title: 'Nombre del alumno 2',
    },
    {
      id:4,
      status: 1,
      color: 'amber',
      icon: 'mdi-gesture-tap-button',
      subtitle: 'Jan 10, 2014',
      title: 'Nombre del alumno 2',
    },
    {
      id:5,
      status: 1,
      color: 'amber',
      icon: 'mdi-gesture-tap-button',
      subtitle: 'Jan 10, 2014',
      title: 'Nombre del alumno 2',
    },
]);



// TODO: DEBE CAMBIAR UN STORE, PARA PASARLO A COMPOSABLE
const changeStatus = (alumn_id,status) => {
  // Buscar en el array de objetos alumno con un id
  alumns.value.forEach(element => {
    if (element.id === alumn_id) {
      element.status = statusNext(status);
    }
  });

}

// Example send button
const loading = ref(false);
const load = () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 3000)
}

const isDisabledButton = computed(() => {
  // console.log(online.value);
  // console.log(loading.value);
  // if (!online.value) { return true; } //sin conexion
  // else if (loading.value) { return true; } // cargando loading
  return (!online.value || loading.value) ? true : false;
  // return false;
})


</script>
<template>

    <v-row no-gutters class="bg-blues">
      <v-col v-for="alumn in alumns" :key="alumn.title"
            cols="12" sm="6" md="4" lg="3" xl="2" >

          <v-card @click="changeStatus(alumn.id,alumn.status)" class="ma-2 pa-0">
              <v-list>
                <v-list-item :title="alumn.title" :subtitle="statusText(alumn.status)+' Hora: '+hora" >
                  <template v-slot:prepend>
                    <!-- <v-avatar :color="statusColor(alumn.status)">
                      <v-icon :icon="statusIcon(alumn.status)" color="white"></v-icon>
                    </v-avatar> -->
                    <v-avatar >
                      <v-icon :icon="statusIcon(alumn.status)" :color="statusColor(alumn.status)"></v-icon>
                    </v-avatar>
                  </template>

                  <template v-slot:append>
                    <!-- <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn> -->
                    <!-- <v-icon icon="mdi-vuetify"></v-icon> -->
                  </template>

                </v-list-item>
              </v-list>
          </v-card>
      </v-col>

      <!-- TODO: El botón solo estára disponible si tiene conexión a internet, deshabilitar botón y poner icono de carita triste  mdi-emoticon-sad-outlin -->
      <v-col col="12" sm="12" class="d-flex justify-space-around align-center ma-2 pa-2">
        <v-btn
          prepend-icon="mdi-check"
          :loading="loading"
          :disabled="isDisabledButton"
          color="secondary"
          @click="load()"
          size="large" rounded="pill">
           {{ online? 'Guardar asistencias':'Sin conexión' }}
        </v-btn>
      </v-col>


    </v-row>
</template>
