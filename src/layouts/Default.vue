<script setup>

  import { useOnline } from '@vueuse/core'

  import DefaultFooter from "./DefaultFooter.vue";
  import DefaultHeader from "./DefaultHeader.vue";
  import DefaultSistem from "./DefaultSistem.vue";

  const online = useOnline()

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


