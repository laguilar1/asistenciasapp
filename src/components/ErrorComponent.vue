<script setup>
import { ref } from 'vue';

const aspectRatio = ref(20/20);
const width = ref(300);


</script>
<template>
  <v-container style="height: 300px;">
    <v-row class="fill-height" align-content="center" justify="center">

      <v-col cols="6">
          <v-img :aspect-ratio="aspectRatio" :width="width" src="../../public/img/loadError.png"
            cover></v-img>
      </v-col>
      <v-col class="text-subtitle-1 text-center" cols="12">
        Hubo un error al cargar los datos
      </v-col>
    </v-row>
  </v-container>
</template>
