<script setup>
  import { useRouter, useRoute } from 'vue-router'
  import DefaultHeaderMenu from './DefaultHeaderMenu.vue'

  const router = useRouter()
  const route = useRoute()
</script>
<template>
  <v-app-bar color="primary" density="compact">

    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <!-- Mediano y grande -->
    <v-img class="mx-4 d-none d-sm-flex"
      src="../assets/logo.png" max-height="120" max-width="120" contain>
    </v-img>

    <v-img class="mx-4 d-flex d-sm-none"
      src="../assets/logo_.png" max-height="50" max-width="50" contain>
    </v-img>

    <!-- <v-spacer></v-spacer> -->
    <!-- <v-app-bar-title class="d-flex d-lg-flex">
      <span >Control de asistencias</span>
    </v-app-bar-title> -->

    <v-spacer></v-spacer>

    <v-btn selected-class="" @click.stop="router.push('/')" exact-path  icon>
      <v-icon> mdi-home-outline </v-icon>
    </v-btn>

    <DefaultHeaderMenu/>

  </v-app-bar>
</template>

<style>
/* a #boton .v-btn--active .sel{
  background: blue !important;
  color: initial;
} */
</style>
