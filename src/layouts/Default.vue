<script setup>

  import {ref} from 'vue'
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

            <v-btn color="blue-grey" prepend-icon="mdi-cloud-upload"
            to="/auth?id=123&name=luis&email=luis@mail.com&surname=aguilar">
            </v-btn>

            <v-btn color="blue-grey" prepend-icon="mdi-cloud-upload"
            to="/logout">
            </v-btn>




          <router-view />
        </v-main>

        <DefaultFooter/>
      </v-app>
</template>


