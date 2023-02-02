<script setup>
import { useRouter } from 'vue-router'
import { inject, ref, toRef, defineEmits } from 'vue'
import { useOnline } from '@vueuse/core'
import { useRoomStore } from "../store/room";
const axios = inject('axios')  // inject

const props = defineProps({
  modal: {
    type: Boolean,
    required: true
  },
  salon: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
})
const roomStore = useRoomStore()
const modalState = toRef(props, 'modal')
const { salon, hora, date } = props
const newId = salon + '-' + hora + '-' + date;
const online = useOnline()
console.log('salon ', salon)
console.log('hora ', hora)
console.log('date ', date)


const emit = defineEmits(['emitClose']) //Se puede tener mas de un emit

const router = useRouter();

const disabledButtons = ref(false)

// CLOSE PARENT MODAL
const closeModal = () => {
  disabledButtons.value = false
  emit('emitClose',false) //Señalas el emit y el valor a enviar
}

// Debe ser a la ruta de la app para borrar datos internos
const closeList = (newId) => {
  console.log('close list')
  disabledButtons.value = true
  // 1 = enviado 0 = no enviado 2 = cerrado
  const statusRoom = 2
  // Change status
  console.log(newId)
  roomStore.changeStatusRoom(newId, statusRoom)
  closeModal()
}

const requestList = (newId) => {
  console.log('request list')
  disabledButtons.value = true

  axios.post('profesores/asistencias/asistencia')
    .then((response) => {
      if (response.statusText === 'OK') {

        sendList() //Cambia status interno

      } else {
        console.log('error endpoint')
      }
    }).catch((error) => {
      console.error('Error en la petición', error)
      disabledButtons.value = false
    });

}
const sendList = (newId) => {
  // 1 = enviado 0 = no enviado 2 = cerrado
  const statusRoom = 1
  console.log(newId)
  // Change status
  roomStore.changeStatusRoom(newId, statusRoom)
  dataStore.changeStatusTakeList(id_salon, hora, statusRoom)
  // Funcion hacer barrido de enviado listStore
  // Permite solo visualizar los retardos y faltas sin cerrar la lista
  // listStore.changeStatusToSend(newId, statusRoom) //TODO: VER SI ES UTIL
}
</script>
<template>
  <!-- Dialogo sesión -->

  <div class="text-center">
    <v-dialog v-model="modalState" persistent>
      <v-card>
        <v-toolbar color="primary" title="Cerrar o Enviar lista"></v-toolbar>
        <v-card-text>

          ¿Desea cerrar o enviar la lista? Si cierra la lista podra continuar tomando lista en las siguientes horas sin enviar la lista por internet, si decide enviar la lista la lista se cerrará y será enviada por internet.

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text" @click="closeModal">
            Cancelar
          </v-btn>
          <v-btn variant="text" @click="closeList(newId)" :disabled="disabledButtons">
            Cerrar Lista
          </v-btn>
          <v-btn variant="text" @click="requestList(newId)" :disabled="disabledButtons || !online">
            Enviar Lista
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
