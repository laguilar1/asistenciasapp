<script setup>

  import { useOnline } from '@vueuse/core'
  import { useTheme } from 'vuetify'

  import DefaultFooter from "./DefaultFooter.vue";
  import DefaultHeader from "./DefaultHeader.vue";
  import DefaultSistem from "./DefaultSistem.vue";

  const online = useOnline()
  const theme = useTheme()

  if (localStorage.getItem('theme')) {
    //para que no se meta otro theme que no sea esos dos
    theme.global.name.value =
      localStorage.getItem('theme') === 'dark'
        ? 'dark'
        : 'light';
  }

</script>
<template>
      <v-app>
        <!-- <v-navigation-drawer>...</v-navigation-drawer> -->
        <DefaultSistem v-if="!online" fixed/>

        <DefaultHeader/>

        <v-main>
          <router-view />
        </v-main>

        <DefaultFooter/>
      </v-app>
</template>


