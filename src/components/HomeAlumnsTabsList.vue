<script setup>
import { ref, computed } from 'vue';
import { useOnline } from '@vueuse/core'

import useStatus from '../composables/useStatus'

import { useListStore } from "../store/list";
import { useStudentStore } from "../store/student";

const { statusIcon, statusColor, statusText, statusNext } = useStatus();

const online = useOnline()
const listStore = useListStore()
const studentStore = useStudentStore()

const props = defineProps({
  hora: {
    type: String,
    required: true
  },
  salon: {
    type: String,
    required: true
  },
})
const { hora, salon } = props;
const newId = salon + '-' + hora;
// console.log(hora)
// console.log(salon)
// setTimeout(() => {
//   const alumnos = searchAlumns(salon);
//   console.log('aal ', alumnos);

// }, 1000);


// console.log(listStore.lis[newId])

const changeStatus = (newId, idAlumno, status) => {

  const newStatus = statusNext(status)
  listStore.changeStatusList(newId, idAlumno, newStatus)

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

  <div>HORA {{ hora }} - Newid {{ newId }}</div>
    <v-row no-gutters class="bg-blues">
      <v-col v-for="alumn in listStore.list[newId]" :key="alumn.idAlumno"
            cols="12" sm="6" md="4" lg="3" xl="2" >

          <v-card @click="changeStatus(newId, alumn.idAlumno,alumn.asistencia)" class="ma-2 pa-0">
              <v-list>
                <v-list-item :title="studentStore.students[alumn.idAlumno]" :subtitle="statusText(alumn.asistencia) + ' Hora: ' + hora + ' Status: ' + alumn.asistencia" >
                  <template v-slot:prepend>
                    <!-- <v-avatar :color="statusColor(alumn.asistencia)">
                      <v-icon :icon="statusIcon(alumn.asistencia)" color="white"></v-icon>
                    </v-avatar> -->
                    <v-avatar >
                      <v-icon :icon="statusIcon(alumn.asistencia)" :color="statusColor(alumn.asistencia)"></v-icon>
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
          color="primary"
          @click="load()"
          size="large" rounded="pill">
           {{ online? 'Guardar asistencias':'Sin conexión' }}
        </v-btn>
      </v-col>


    </v-row>
</template>
