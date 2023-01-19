<script setup>
import { useUserStore } from "../store/user";
import { useOnline } from '@vueuse/core'

import useMode from '../composables/useMode'

const online = useOnline()
const store = useUserStore()
const { toggleTheme, themeIcon, themeIconText } = useMode()
//menu
const onlineItems = [
  { id: 1, text: 'Refrescar', icon: 'mdi-web-refresh', link: "/refresh" },
  { id: 2, text: 'Cerrar Sesión', icon: 'mdi-logout-variant', link: "/logout" },

];


</script>
<template>

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

        <template v-for="(item, index) in onlineItems" :key="index">
          <v-list-item :value="index" :to="item.link">
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </template>

      </v-list>


    </v-card>
  </v-menu>
</template>
