<script setup>

//Store
import { useDataStore } from "../store/data";
import { useRoomStore } from "../store/room";

const dataStore = useDataStore()
const roomStore = useRoomStore()

const { schools } = dataStore;
console.log('Data store: ',schools)

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
          <v-expansion-panel v-for="materia in carrera.materias" :key="materia.IdCurricula" :title="materia.Materia">
            <v-expansion-panel-text>

              <v-list-item v-for="salon, i in materia.salones" :key="i" :value="salon.nombre" active-color="primary" :to='"/alumns/"+salon.idSalon+"/"+salon.vecesLista'
              :disabled="roomStore.getStudents(salon.idSalon)  ? false : true">
                <!-- :class="item.finalized ?'bg-green-lighten-5' : ''" -->
                <!-- <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template> -->

                <v-list-item-title>
                  {{ salon.nombre + ' (' + roomStore.getStudents(salon.idSalon) + ')'}}
                </v-list-item-title>

                <!-- {{ salon.tomadaLista }} -->
                <template v-slot:append>
                  <!-- <v-btn color="green darken-3" :icon="item.finalized ? 'mdi-check' : ''" variant="text"></v-btn> -->
                    <div v-for="n in salon.vecesLista">
                        <!-- {{ salon.idSalon + '-' + (n) }} *** -->
                        <!-- {{ roomStore.room[salon.idSalon + '-' + (n)].status }} *** -->
                        <!-- {{ roomStore.getStatus(salon.idSalon,n) }} *** -->
                        <!-- {{ roomStore.getStudents(salon.idSalon) }} *** -->
                    </div>

                    <v-icon :color="roomStore.getStatus(salon.idSalon,n) ? 'green darken-4' : 'grey'" :icon="roomStore.getStatus(salon.idSalon,n) ? 'mdi-check' : 'mdi-check'" variant="text" v-for="n in salon.vecesLista"></v-icon>
                    <!-- <v-badge disabled @click.stop
                    :color="roomStore.getStudents(salon.idSalon) ? 'info' : 'grey'"
                    :content="roomStore.getStudents(salon.idSalon)" inline>
                    </v-badge> -->
                    <!-- <v-icon :color="tomada ? 'green darken-4' : 'red'" :icon="tomada ? 'mdi-flag' : 'mdi-flag'" variant="text" v-for="n in salon.vecesLista">{{ i }}</v-icon> -->

                </template>

              </v-list-item>

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
