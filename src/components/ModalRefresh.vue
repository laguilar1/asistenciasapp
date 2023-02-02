<script setup>
import { useRouter } from 'vue-router'
import { ref, toRef, defineEmits } from 'vue'
import useRefresh from '../composables/useRefresh'

const props = defineProps({
  modal: {
    type: Boolean,
    required: true
  },
})
const modalState = toRef(props, 'modal')
const emit = defineEmits(['emitClose']) //Se puede tener mas de un emit
const { refresh } = useRefresh()
const router = useRouter();

const disabledRefresh = ref(false)

// CLOSE PARENT MODAL
const closeModal = () => {
  emit('emitClose',false) //Señalas el emit y el valor a enviar
}

</script>
<template>
  <!-- Dialogo sesión -->
  <div class="text-center">
    <v-dialog v-model="modalState" persistent>
      <v-card>
        <v-toolbar color="primary" title="Refrescar datos"></v-toolbar>
        <v-card-text>
          ¿Desea refrescar los datos de la aplicación? Los datos listas cerradas que no hayan sido enviadas, se van a borrar del
          la aplicación
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text" @click="closeModal"  :disabled="disabledRefresh">
            Cancelar
          </v-btn>
          <v-btn color="red" variant="text" @click="refresh" :disabled="disabledRefresh">
            Deacuerdo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
