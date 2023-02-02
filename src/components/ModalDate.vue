<script setup>
import { ref, toRef, defineEmits } from 'vue'


const props = defineProps({
  modal: {
    type: Boolean,
    required: true
  },
})
const modalState = toRef(props, 'modal')
const emit = defineEmits(['emitClose']) //Se puede tener mas de un emit

// CLOSE PARENT MODAL
const closeModal = () => {
  emit('emitClose', false) //Señalas el emit y el valor a enviar

}

</script>
<template>
  <!-- Dialogo sesión -->
  <div class="text-center">
    <v-dialog v-model="modalState" persistent>
      <v-card>
        <v-toolbar color="primary" title="Fecha actualizada"></v-toolbar>
        <v-card-text>
          La fecha del sistema va a ser actualizada, podrá ver las listas pendientes de enviar en la sección "pendientes"
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="text" @click="closeModal">
            Deacuerdo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>
