<script setup>
  import { computed, ref } from 'vue';
  import { useTheme } from 'vuetify'
  import DefaultHeaderMenu from './DefaultHeaderMenu.vue'

  const theme = useTheme()
  const toggleTheme = () => {
    theme.global.name.value =
      theme.global.current.value.dark ? 'light'
        : 'dark'
}

const themeIcon = computed(() => {
  return theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
})


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
      <span >Sistema de Asistencias</span>
    </v-app-bar-title> -->

    <v-spacer></v-spacer>

    <v-btn icon to="/" exact>
      <v-icon> mdi-home-outline </v-icon>
    </v-btn>

    <v-btn icon @click="toggleTheme">
      <v-icon>
        {{ themeIcon }}
      </v-icon>
    </v-btn>

    <DefaultHeaderMenu/>




  </v-app-bar>
</template>

<style>

</style>
