<script setup>
import { ref } from 'vue';

const aspectRatio = ref(15/15);
const width = ref(200);


</script>
<template>
  <v-container style="height: 200px;" class="my-10">
    <v-row class="fill-height" align-content="center" justify="center">
      <v-col cols="6">
          <v-img :aspect-ratio="aspectRatio" :width="width" src="/img/empty-green.png"
            cover></v-img>
          <p class="mt-2">Ya se tomó lista y ha sido enviada</p>
      </v-col>
    </v-row>
  </v-container>
</template>
