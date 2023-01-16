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
  <v-app-bar color="secondary" density="compact">

    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <v-img class="mx-2"
      src="https://dgesui.ses.sep.gob.mx/sep.subsidioentransparencia.mx/images/universidades/escudos/UCOL.png"
      contain>
    </v-img>

    <v-spacer></v-spacer>
    <v-app-bar-title>
      Control de asistencias
    </v-app-bar-title>

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
