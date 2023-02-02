<script setup>
import { ref, computed } from 'vue';
import { useOnline } from '@vueuse/core'
import ImageSaveList from '@/components/ImageSaveList'
import ImageCloseList from '@/components/ImageCloseList'
import useStatus from '../composables/useStatus'

import { useListStore } from "../store/list";
import { useStudentStore } from "../store/student";
import { useRoomStore } from "../store/room";
import { useDataStore } from "../store/data";
import { useUserStore } from "../store/user";


const { statusIcon, statusColor, statusText, statusNext } = useStatus();

const online = useOnline()
const listStore = useListStore()
const studentStore = useStudentStore()
const roomStore = useRoomStore()
const dataStore = useDataStore()
const userStore = useUserStore()


const props = defineProps({
  hora: {
    type: String,
    required: true
  },
  salon: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
})
const { hora, salon, date } = props;
const today = date
// const today = userStore.user.date
console.log('today-- >', today)
const newId = salon + '-' + hora + '-' + today;
console.log(newId)

const snackbar = ref(false)
const text = `Actualizado correctamente`
const timeout = 2000

// Example send button
const loading = ref(false);
// const loadingBody = ref(true)
// console.log(hora)
// console.log(salon)
// setTimeout(() => {
//
// }, 1000);


// console.log(listStore.lis[newId])


const changeStatusCards = (newId, idAlumno, status) => {

  const newStatus = statusNext(status)
  listStore.changeStatusList(newId, idAlumno, newStatus)

}

const esEnviado = (newId, idAlumno) => {
  const result = listStore.getSendStatus(newId, idAlumno)
  // console.log(result)
  return result
  // return false
}


const changeStatusToSend = (id_salon, hora, today) => {
  const newId = salon + '-' + hora+'-'+today;
  // 1 = enviado 0 = no enviado 2 = cerrado
  const statusRoom = 1
  console.log(newId)

  // Change status
  roomStore.changeStatusRoom(newId, statusRoom)
  dataStore.changeStatusTakeList(id_salon, hora, statusRoom)
  // Funcion hacer barrido de enviado listStore
  // Permite solo visualizar los retardos y faltas sin cerrar la lista
  listStore.changeStatusToSend(newId, statusRoom)

  // Funcion para saber si ya está completado
  // TODO: CAMBIAR ESTA LOGICA, SE PUEDE CERRAR UNA LISTA
  //  EN ROOM STATUS
  // isComplete.value = listStore.isCompletelist(newId);

}



const actionCloseList = (salon, hora, today) => {
  console.log('close list')
  const newId = salon + '-' + hora + '-' + today;
  // 1 = enviado 0 = no enviado 2 = cerrado
  const statusRoom = 2
  // Change status
  roomStore.changeStatusRoom(newId, statusRoom)
}



const load = (salon, hora, today) => {

  loading.value = true
  setTimeout(() => {

    // TODO: HACER LA PETICIÓN  POST SI TODO ES CORRECTO

        // Change status
        changeStatusToSend(salon, hora, today);
        loading.value = false
        snackbar.value = true


  }, 2100)
}

const isDisabledButton = computed(() => {
  // console.log(online.value);
  // console.log(loading.value);
  // if (!online.value) { return true; } //sin conexion
  // else if (loading.value) { return true; } // cargando loading
  return (!online.value || loading.value) ? true : false;
  // return false;
})





// Funcion watcher estárá observando un arbol en  store.list
  // Si vee que todos los alumnos tienen eviado es true
  // Deshabilita el boton de Guardar asistencia
  // Se le va a poner una leyenda
</script>
<template>

  <!-- <div>HORA {{ hora }} - salon {{ salon }}</div> -->
      {{ roomStore.room[newId].status }}
    <ImageSaveList v-if="roomStore.room[newId].status===1"></ImageSaveList>
    <ImageCloseList v-if="roomStore.room[newId].status===2"></ImageCloseList>

    <v-snackbar v-model="snackbar" rounded="pill" :timeout="timeout" location="bottom right">
      <v-icon color="green">mdi-check-circle</v-icon>
      {{ text }}
      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-row no-gutters class="bg-blues" v-if="!roomStore.room[newId].status">
      <v-col v-for="alumn,i in listStore.list[newId]" :key="alumn.idAlumno"
            cols="12" >
            <!-- sm="6" md="4" lg="3" xl="2" -->

          <v-card @click="changeStatusCards(newId, alumn.idAlumno,alumn.asistencia)" class="ma-2 pa-0"
          :disabled="esEnviado(newId, alumn.idAlumno)"
          v-if="!esEnviado(newId, alumn.idAlumno)"
          >
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


      <v-col col="5" sm="5" class="d-flex justify-space-around align-center ma-2 pa-2 " v-if="!roomStore.room[newId].status" >
        <v-btn :loading="loading" color="info"
          to="/" size="large" rounded="pill">
          <v-icon>mdi-arrow-left</v-icon>

        </v-btn>
      </v-col>


      <!-- TODO: HACER UNA MODAL EN EL CUAL LE INDIQUE SI QUIERE CERRAR LA LISTA O LA QUIERE ENVIAR CON ALGUNA LEYENDA INDICANDO LA DIFERENCIA ENTRE CADA UNO  así quedaria un solo boton-->

      <!-- TODO: EL CODIGO DE ACCION PARA ENVIAR O CERRAR QUEDARIA EN LA MODAL -->

      <!-- TODO: HACER CODIGO PARA BLOQUEAR LAS HORAS POSTERIORES QUE NO TENGA EL ESTATUS 1 DE ENVIADO O 2 DE CERRADO OSEA ESTÉ EN 0 -->

      <!-- TODO: LIMPIAR EL CODIGO DE TABS PARA QUE NO DUPLIQUE -->

      <!-- TODO: CREAR FUNCION PARA EL COLOR DE ESTADO 2 QUE ES AMARILLO -->
      <v-col col="5" sm="5" class="d-flex justify-space-around align-center ma-2 pa-2 " v-if="!roomStore.room[newId].status" >
        <v-btn :loading="loading" color="primary"
          @click="actionCloseList(salon, hora, today)" size="large" rounded="pill">
          Cerrar lista
        </v-btn>
      </v-col>

      <v-col col="5" sm="5" class="d-flex justify-space-around align-center ma-2 pa-2 " v-if="(roomStore.room[newId].status === 1) ? false : true ">
        <v-btn :loading="loading" :disabled="isDisabledButton" color="primary"
          @click="load(salon, hora, today)" size="large" rounded="pill">
          {{ online? 'Enviar lista':'Enviar lista' }}
        </v-btn>
      </v-col>


    </v-row>

</template>
