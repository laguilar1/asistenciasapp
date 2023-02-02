<script setup>

//Store
import { useDataStore } from "../store/data";
import { useRoomStore } from "../store/room";
import { useUserStore } from "../store/user";

import useStatus from '../composables/useStatus'

const dataStore = useDataStore()
const roomStore = useRoomStore()
const userStore = useUserStore()

const today = userStore.user.date

const { schools } = dataStore;
const { statusColorlist } = useStatus();
// console.log('Data store: ',schools)

// const getStatus =  (idSalon, hora) => {
//   try {
//     return roomStore.room[idSalon + '-' + (hora)].status
//   } catch(err) {
//     console.log(err)
//   }
// }

// const getStudents = (idSalon) => {
//   try {
//     // return roomStore.room[idSalon + '-' + (hora)].status
//     return roomStore.room[idSalon + '-1'].students

//   } catch(err) {
//     console.log(err)
//   }
// }

</script>
<template>

  <!-- Hello world Home Subject list -->
<div v-for="school in schools" :key="school.cvePlantel">
  <div class="text-subtitle-2 mt-4 mb-2">{{ school.plantel }} </div>
  <v-expansion-panels variant="accordion" class="mt-4">
    <v-expansion-panel v-for="carrera in school.carreras" :key="carrera.cvePlanEstudio" :title="carrera.planEstudio">
      <v-expansion-panel-text  id="expansion-whitout-padding">
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor -->
        <!-- <v-list :items="grupos" to='/alumns'></v-list> -->

        <v-expansion-panels variant="accordion" class="ma-0">
          <v-expansion-panel v-for="materia in carrera.materias" :key="materia.IdCurricula" :title="materia.materia">
            <v-expansion-panel-text>

              <v-expansion-panels variant="accordion" class="ma-0">
                <v-expansion-panel v-for="salon, i in materia.salones" :key="i" :value="salon.nombreSalon"
                  :title="salon.nombreSalon + ' (' + roomStore.getStudents(salon.idSalon, today) + ' alumnos)'">
                  <v-expansion-panel-text>

                      <v-list-item v-for="n in parseInt(salon.vecesLista)" :key="n" :value="salon.nombreSalon" active-color="primary"
                        :to='"/alumns/" + salon.idSalon + "/"+n+"/"+today'
                        :disabled="roomStore.getStudents(salon.idSalon, today)  ? false : true">

                        <v-list-item-title>
                         HORA {{ n }}
                        </v-list-item-title>

                        <template v-slot:append>
                          <v-icon :color="statusColorlist(roomStore.getStatus(salon.idSalon, n, today))"
                            icon="mdi-check" variant="text"
                            ></v-icon>
                        </template>

                      </v-list-item>


                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>

            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>


      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>




</div>
</template>
<style scoped>
/* #expansion-whitout-padding .v-expansion-panel-text__wrapper { */
#expansion-whitout-padding:deep(.v-expansion-panel-text__wrapper){
  padding-right: 10px;
  padding-left: 10px;
}
</style>
