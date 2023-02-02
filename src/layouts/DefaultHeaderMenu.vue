<script setup>
import { ref } from 'vue';
import { useOnline } from '@vueuse/core'

import ModalSession from '@/components/ModalSession.vue'
import ModalRefresh from '@/components/ModalRefresh.vue'

import useLogin from "../composables/useLogin";
import useMode from '../composables/useMode'
// import useRefresh from '../composables/useRefresh'

// Stores
import { useUserStore } from "../store/user";

//Emits
// defineEmits(['eventModalSession', false])

const online = useOnline()
const store = useUserStore()

const dialogSesion = ref(false)
const dialogRefresh = ref(false)
// const disabledSesion = ref(false)

const { toggleTheme, themeIcon, themeIconText } = useMode()
// const { refresh, dialogRefresh, disabledRefresh } = useRefresh()
const { loginUrl } = useLogin();

// console.log(dialogRefresh.value)
//menu


const statusModalSession = (value) => {
  dialogSesion.value = value
  // console.log('Since child the Session value is: ', value)
}

const statusModalRefresh = (value) => {
  dialogRefresh.value = value
  // console.log('Since child the Refresh value is: ', value)
}



</script>
<template>

  <!-- Dialog Session -->
  <ModalSession :modal="dialogSesion" @emitClose="statusModalSession" />

  <!-- Dialog Refresh -->
  <ModalRefresh :modal="dialogRefresh" @emitClose="statusModalRefresh"/>

  <v-menu location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item :title="store.user.name" :subtitle="store.user.email">
          <template v-slot:prepend>
            <v-avatar color="grey">
              <v-icon color="white">mdi-account</v-icon>
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-subheader>Configuración</v-list-subheader>
          <v-list-item value="1" @click="toggleTheme">
            <template v-slot:prepend>
              <v-icon :icon="themeIcon"></v-icon>
            </template>
            <v-list-item-title>{{ themeIconText }}</v-list-item-title>
          </v-list-item>
      </v-list>

      <v-list :disabled="!online">
        <v-list-subheader>Acciones</v-list-subheader>

        <v-list-item  @click="dialogRefresh = true">
          <template v-slot:prepend>
            <v-icon icon="mdi-web-refresh"></v-icon>
          </template>
          <v-list-item-title>Refrescar</v-list-item-title>
        </v-list-item>

        <v-list-item @click="dialogSesion = true">
          <template v-slot:prepend>
            <v-icon icon="mdi-logout-variant"></v-icon>
          </template>
          <v-list-item-title>Cerrar Sesión</v-list-item-title>
        </v-list-item>

      </v-list>

    </v-card>

  </v-menu>

</template>
