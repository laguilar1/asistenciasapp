<script setup>
import { ref } from 'vue';
// import { useRoute } from 'vue-router'
import { useRoomStore } from "../store/room";

import useStatus from '../composables/useStatus'
import ImageSendList from '@/components/ImageSendList'

const room = useRoomStore();
const { statusColor } = useStatus();






</script>

<template>

  <v-container fluid>
    <!-- <p class="text-center text-h6 font-weight-regular mt-2"> {{ plantel }}</p> -->
    <p class="text-center text-h6 font-weight-regular">Listas cerradas</p>
    <p class="text-center text-subtitle-2 font-weight-regular"> Pendientes de enviar</p>

    <v-divider></v-divider>

      <v-row>
          <v-col cols="12">
            <ImageSendList v-if="!room.countClosed"></ImageSendList>

            <div v-else class="mt-4 text-subtitle-2">Listas cerradas:</div>
            <template v-for="value, name, index in room.room">
              <v-card  class="mt-3" v-if="value.status===2">
                <v-list>
                  <v-list-item :title="value.plantel">
                    <v-list-item-subtitle>
                      {{ value.planEstudio }} - {{ value.grado }} - {{ value.status }}
                      <!-- <v-icon>mdi-check</v-icon> -->
                    </v-list-item-subtitle>

                    <!-- <template v-slot:prepend>
                      <v-avatar color="grey">
                        <v-icon color="white">mdi-check</v-icon>
                      </v-avatar>
                    </template> -->

                    <template v-slot:append>
                      <v-btn :color="statusColor(value.status)" icon="mdi-send" variant="text"></v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </template>
          </v-col>
      </v-row>
  </v-container>
</template>

