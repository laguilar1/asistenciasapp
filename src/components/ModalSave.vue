<script setup>
import { useRouter } from 'vue-router'
import { inject, ref, toRef, defineEmits } from 'vue'
import { useOnline } from '@vueuse/core'
import { useRoomStore } from "../store/room";
import { useDataStore } from "../store/data";

import useHeader from '../composables/useHeader'

const axios = inject('axios')  // inject

const { config, getDataRequest, getSalonNewId, getHoraNewId } = useHeader();

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
  hiddenClose: {
    type: String,
    default: "false"
  }
})
const roomStore = useRoomStore()
const dataStore = useDataStore()
const modalState = toRef(props, 'modal')
const { salon, hora, date, hiddenClose } = props
const newId = salon + '-' + hora + '-' + date;
const online = useOnline()
console.log('salon ', salon)
console.log('hora ', hora)
console.log('date ', date)
console.log('hiddenClose', typeof (hiddenClose))

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
  // roomStore.disabledRoom()
  closeModal()
}
console.log(getDataRequest(newId))

const requestList = (newId) => {
  console.log('request list')
  disabledButtons.value = true
  const data = getDataRequest(newId)
  axios.post('asistencias/asistencia',data, config)
    .then((response) => {
      if (response.statusText === 'OK') {

        sendList(newId) //Cambia status interno
        // roomStore.disabledRoom()
        // TODO: CERRAR LA MODAL, SE QUEDA ABIERTA
        closeModal()

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
  const id_salon = getSalonNewId(newId)
  const hora = getHoraNewId(newId)
  console.log(newId)
  // Change status
  roomStore.changeStatusRoom(newId, statusRoom)
  dataStore.changeStatusTakeList(id_salon, hora, statusRoom)
}
</script>
<template>
  <!-- Dialogo sesión -->

  <div class="text-center">
    <v-dialog v-model="modalState" persistent>
      <v-card>
        <v-toolbar color="primary" :title="(hiddenClose === 'false') ? 'Cerrar o enviar lista':'Enviar lista'"></v-toolbar>
        <v-card-text>
          <p v-if="hiddenClose==='false'">
            ¿Desea cerrar o enviar la lista? Si cierra la lista podra continuar tomando lista en las siguientes horas sin enviar la lista por internet, si decide enviar la lista esta se cerrará y será enviada por internet.
          </p>
          <p v-else>
            ¿Está seguro que desea enviar la lista?
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeModal">
            Cancelar
          </v-btn>
          <v-btn color="warning" variant="text" @click="closeList(newId)" :disabled="disabledButtons" v-if="hiddenClose==='false'">
            Cerrar
          </v-btn>
          <v-btn color="success" variant="text" @click="requestList(newId)" :disabled="disabledButtons || !online">
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
