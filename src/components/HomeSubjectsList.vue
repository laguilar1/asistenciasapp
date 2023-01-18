<script setup>

const materias = [
  {
    title: 'Materia 1',
    value: 1,
    icon: 'mdi-flag',
  },
  {
    title: 'Materia 2',
    value: 2,
    icon: 'mdi-flag',
  },
  {
    title: 'Materia 3',
    value: 3,
    icon: 'mdi-flag',
  },
]

// Grado y grupo
const grados = [
  {
    title: '1°A',
    value: 1,
    icon: 'mdi-flag',
    finalized: true,
  },
  {
    title: '1°B',
    value: 2,
    icon: 'mdi-flag',
    finalized: true,
  },
  {
    title: '2°A',
    value: 3,
    icon: 'mdi-flag',
    finalized: false,
  },
]



</script>
<template>

  <!-- Hello world Home Subject list -->

  <div class="text-subtitle-2 mt-4 mb-2">Bachillerato 33 </div>
  <v-expansion-panels variant="accordion" class="mt-4">
    <v-expansion-panel v-for="i in 3" :key="i" title="Carrera: Ingenieria en Sistemas Computacionales">
      <v-expansion-panel-text  id="expansion-whitout-padding">
        <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor -->
        <!-- <v-list :items="grupos" to='/alumns'></v-list> -->

        <v-expansion-panels variant="accordion" class="ma-0">
          <v-expansion-panel v-for="i in 3" :key="i" title="Materia con un nombre largo para testear la visualización del contenido">
            <v-expansion-panel-text>

              <v-list-item v-for="(item, i) in grados" :key="i" :value="item" active-color="primary" to='/alumns' :class="item.finalized ?'bg-green-lighten-5' : ''">
                <!-- <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template> -->

                <v-list-item-title v-text="item.title" ></v-list-item-title>

                <template v-slot:append>
                  <!-- <v-btn color="green darken-3" :icon="item.finalized ? 'mdi-check' : ''" variant="text"></v-btn> -->
                  <v-icon color="green darken-4" :icon="item.finalized ? 'mdi-check' : ''" variant="text"></v-icon>
                </template>

              </v-list-item>

            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>


      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>





</template>
<style scoped>
/* #expansion-whitout-padding .v-expansion-panel-text__wrapper { */
#expansion-whitout-padding:deep(.v-expansion-panel-text__wrapper){
  padding-right: 10px;
  padding-left: 10px;
}
</style>
