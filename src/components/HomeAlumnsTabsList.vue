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
//
// }, 1000);


// console.log(listStore.lis[newId])

const changeStatus = (newId, idAlumno, status) => {

  const newStatus = statusNext(status)
  listStore.changeStatusList(newId, idAlumno, newStatus)

}

const esEnviado = (newId, idAlumno) => {

  const result = listStore.getSendStatus(newId, idAlumno)
  console.log(result)
  return result
  // return false
}

// Example send button
const loading = ref(false);

const load = () => {
  snackbar.value = true
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

const snackbar = ref(false)
const text =  `Hello, I'm a snackbar`



// TODO: PONER EN STORE LIST UN CAMPO, ENVIADO EL CUAL SERÁ 0 O 1
// CUANDO SE RECARGUE POR PRIMERA VEZ, TENDRA LA CONDICION DE
// SI EL FORMULARIO YA SE ENVIÓ, Y SI ASISTENCIA ES UNO
// ENTONCES EL CAPO ENVIADO ES 1, SI NO ES 0

// CADA QUE SE ENVÍ EL EL FORMULARIO CORRECTAMENTE SE VA A ACTUALIZAR
// EL STORE, NUEVAMENTE TODO , SE HARÁ EL BARRIDO DE NUEVO

// ASÍ SE TOMARÁ ENCUENTA SOLO LOS QUE ENVIADO SEAN 0 PARA SER MOSTRADOS
</script>
<template>

  <!-- <div>HORA {{ hora }} - Newid {{ newId }}</div> -->
    <v-row no-gutters class="bg-blues">
      <v-col v-for="alumn,i in listStore.list[newId]" :key="alumn.idAlumno"
            cols="12" sm="6" md="4" lg="3" xl="2" >

          <v-card @click="changeStatus(newId, alumn.idAlumno,alumn.asistencia)" class="ma-2 pa-0" :disabled="esEnviado(newId, alumn.idAlumno)">
              <v-list>
                <v-list-item :title="(i+1)+'-'+studentStore.students[alumn.idAlumno]"
                >
                  <v-list-item-subtitle>
                    <v-icon :icon="statusIcon(alumn.asistencia)" :color="statusColor(alumn.asistencia)"></v-icon>
                    {{ statusText(alumn.asistencia) }}
                  </v-list-item-subtitle>
                  <template v-slot:prepend>
                    <!-- <v-avatar :color="statusColor(alumn.asistencia)">
                      <v-icon :icon="statusIcon(alumn.asistencia)" color="white"></v-icon>
                    </v-avatar> -->

                    <!-- <v-avatar >
                      <v-icon :icon="statusIcon(alumn.asistencia)" :color="statusColor(alumn.asistencia)"></v-icon>
                    </v-avatar> -->

                  </template>

                  <!-- <template v-slot:append>

                    <v-icon :icon="statusIcon(alumn.asistencia)" :color="statusColor(alumn.asistencia)"></v-icon>
                  </template> -->

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



        <v-snackbar v-model="snackbar">
          {{ text }}
          <template v-slot:actions>
            <v-btn color="pink" variant="text" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>


    </v-row>

</template>
