<script setup>
import { ref } from 'vue';
// import { useRoute } from 'vue-router'
import { useRoomStore } from "../store/room";

import SendViewList from '@/components/SendViewList.vue'
import ImageSendList from '@/components/ImageSendList'

const roomStore = useRoomStore();

</script>

<template>

  <v-container fluid>
    <!-- <p class="text-center text-h6 font-weight-regular mt-2"> {{ plantel }}</p> -->
    <p class="text-center text-h6 font-weight-regular">Listas cerradas</p>
    <p class="text-center text-subtitle-2 font-weight-regular"> Pendientes de enviar</p>

    <v-divider></v-divider>

      <v-row>
          <v-col cols="12">
            <ImageSendList v-if="!roomStore.countClosed"></ImageSendList>

            <div v-else class="mt-4 text-subtitle-2">Listas cerradas:</div>
            <template v-for="value, name, index in roomStore.room">
              <v-card  class="mt-3" v-if="value.status===2">
                <SendViewList
                  :plantel="value.plantel"
                  :planEstudio="value.planEstudio"
                  :grado="value.grado"
                  :status="value.status"
                  :newId="name"/>
              </v-card>
            </template>
          </v-col>
      </v-row>
  </v-container>
</template>

