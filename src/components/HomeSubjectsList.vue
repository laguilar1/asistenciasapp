<script setup>

//Store
import { useDataStore } from "../store/data";

const dataStore = useDataStore()


const { schools } = dataStore;
console.log('Data store: ',schools)



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

              <v-list-item v-for="salon, i in materia.salones" :key="i" :value="salon.nombre" active-color="primary" :to='"/alumns/"+salon.idSalon+"/"+salon.vecesLista'>
                <!-- :class="item.finalized ?'bg-green-lighten-5' : ''" -->
                <!-- <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template> -->

                <v-list-item-title v-text="salon.nombre" ></v-list-item-title>

                <!-- {{ salon.tomadaLista }} -->
                <template v-slot:append>
                  <!-- <v-btn color="green darken-3" :icon="item.finalized ? 'mdi-check' : ''" variant="text"></v-btn> -->
                  <v-icon :color="tomada ? 'green darken-4' : 'red'" :icon="tomada ? 'mdi-flag' : 'mdi-flag'" variant="text" v-for="tomada in salon.tomadaLista"></v-icon>


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
