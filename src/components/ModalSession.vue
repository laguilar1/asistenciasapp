<script setup>
import { useRouter } from 'vue-router'
import { ref, toRef, defineEmits } from 'vue'


const props = defineProps({
  modal: {
    type: Boolean,
    required: true
  },
})
const modalState = toRef(props, 'modal')
const emit = defineEmits(['emitClose']) //Se puede tener mas de un emit

const router = useRouter();

const disabledSesion = ref(false)

// CLOSE PARENT MODAL
const closeModal = () => {
  emit('emitClose',false) //Señalas el emit y el valor a enviar
}

// Debe ser a la ruta de la app para borrar datos internos
const closeSesion = () => {
  disabledSesion.value = true
  router.push('/logout')
}
</script>
<template>
  <!-- Dialogo sesión -->
  <div class="text-center">
    <v-dialog v-model="modalState" persistent>
      <v-card>
        <v-toolbar color="primary" title="Cerrar Sesión"></v-toolbar>
        <v-card-text>
          ¿Desea cerrar sesión? Los datos de usuario en la aplicación así como las listas cerradas que no hayan sido
          enviadas, se van a borrar del la aplicación y tendrá que tener conexión a internet para volver a iniciar sesión.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text" @click="closeModal"  :disabled="disabledSesion">
            Cerrar
          </v-btn>
          <v-btn color="red" variant="text" @click="closeSesion" :disabled="disabledSesion">
            Deacuerdo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
