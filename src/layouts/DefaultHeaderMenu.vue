<script setup>
import { useOnline } from '@vueuse/core'
const online = useOnline()

//menu
const onlineItems = [
  { id: 1, text: 'Iniciar Sesión', icon: 'mdi-login-variant', link: "/auth?id=123&name=luis&email=luis@mail.com&surname=aguilar" },
  { id: 2, text: 'Refrescar', icon: 'mdi-web-refresh', link: "/refresh" },
  { id: 3, text: 'Cerrar Sesión', icon: 'mdi-logout-variant', link: "/logout" },

];
</script>
<template>

  <v-menu location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item title="John Leider" subtitle="count@mail.com">
          <template v-slot:prepend>
            <v-avatar color="grey">
              <v-icon color="white">mdi-account</v-icon>
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

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
