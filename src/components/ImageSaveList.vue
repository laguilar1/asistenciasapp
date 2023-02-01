<script setup>
import { ref } from 'vue';

const aspectRatio = ref(20/20);
const width = ref(300);


</script>
<template>
  <v-container style="height: 300px;">
    <v-row class="fill-height" align-content="center" justify="center">

      <v-col cols="6">
          <v-img :aspect-ratio="aspectRatio" :width="width" src="/img/empty.png"
            cover></v-img>
      </v-col>
      <v-col class="text-subtitle-1 text-center" cols="12">
        Ya se tomó lista y ha sido enviada
      </v-col>
    </v-row>
  </v-container>
</template>
