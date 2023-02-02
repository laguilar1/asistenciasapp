<script setup>
import { ref } from 'vue';
import ModalDate from '@/components/ModalDate.vue'
//Store
import { useDataStore } from "../store/data";
import { useRoomStore } from "../store/room";
import { useUserStore } from "../store/user";
import { useRouter } from 'vue-router'

import useStatus from '../composables/useStatus'
import useSchool from '../composables/useSchool'
import useDate from '../composables/useDate'
import useLogin from "../composables/useLogin";

const dataStore = useDataStore()
const roomStore = useRoomStore()
const userStore = useUserStore()
const router = useRouter();
const { loginUrl } = useLogin();


const date = userStore.user.date
const dialogDate = ref(false)
// const { schools } = dataStore;
const { statusColorList } = useStatus();
const { getMainData } = useSchool();
const { today } = useDate();

const statusModalDate = (value) => {
  dialogDate.value = value
  userStore.user.date = today()
  getMainData(userStore.user.date)//creación de stores
  console.log('se actualizó el catalogo')

  setTimeout(() => {
    // Redirect
    dialogDate.value = false
    window.location.href = loginUrl() + '/home/';
  }, 1000);
}


setTimeout(() => {
  if (userStore.user.date !== today()) {
    dialogDate.value = true
  }
}, 2000);
</script>
<template>

<!-- Dialog Session -->
<ModalDate :modal="dialogDate" @emitClose="statusModalDate" />

  <!-- Hello world Home Subject list -->
<div v-for="school in dataStore.schools" :key="school.cvePlantel">
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
                  :title="salon.nombreSalon + ' (' + roomStore.getStudents(salon.idSalon, date) + ' alumnos)'">
                  <v-expansion-panel-text>

                      <v-list-item v-for="n in parseInt(salon.vecesLista)" :key="n" :value="salon.nombreSalon" active-color="primary"
                        :to='"/alumns/" + salon.idSalon + "/"+n+"/"+date'
                        :disabled="roomStore.getStudents(salon.idSalon, date)  ? false : true">

                        <v-list-item-title color="blue">
                         {{ n }}ª Hora
                        </v-list-item-title>

                        <template v-slot:append>
                          <v-icon :color="statusColorList(roomStore.getStatus(salon.idSalon, n, date))"
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
