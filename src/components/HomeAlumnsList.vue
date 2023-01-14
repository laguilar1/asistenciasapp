<script setup>
import { ref } from 'vue';
  const alumns = ref([
    {
      id:1,
      status: '1',
      color: 'blue',
      icon: 'mdi-clipboard-text',
      // subtitle: 'Jan 20, 2014',
      title: 'Nombre del Alumno 1',
    },
    {
      id:2,
      status: '2',
      color: 'amber',
      icon: 'mdi-gesture-tap-button',
      // subtitle: 'Jan 10, 2014',
      title: 'Nombre del alumno 2',
    },
    {
      id:3,
      status: '3',
      color: 'amber',
      icon: 'mdi-gesture-tap-button',
      // subtitle: 'Jan 10, 2014',
      title: 'Nombre del alumno 2',
    },
    {
      id:4,
      status: 1,
      color: 'amber',
      icon: 'mdi-gesture-tap-button',
      subtitle: 'Jan 10, 2014',
      title: 'Nombre del alumno 2',
    },
    {
      id:5,
      status: 1,
      color: 'amber',
      icon: 'mdi-gesture-tap-button',
      subtitle: 'Jan 10, 2014',
      title: 'Nombre del alumno 2',
    },
]);

const statusColor = (status) => {
  if (status === '1') { return 'green' }
  else if (status === '2') { return 'warning' }
  return 'red'
}

const statusIcon = (status) => {
  if (status === '1') { return 'mdi-check' }
  else if (status === '2') { return 'mdi-exclamation' }
  return 'mdi-close'
  // return 'mdi-circle-off-outline'

  // if (status === '1') { return 'mdi-timer-check' }
  // else if (status === '2') { return 'mdi-timer-alert' }
  // return 'mdi-timer-off'
}

const nextStatus = (status) => {

  if (status === '1') { return '2' }
  else if (status === '2') { return '3' }
  return '1';
}

const textStatus = (status) => {

  if (status === '1') { return 'Asistencia' }
  else if (status === '2') { return 'Retardo' }
  return 'Falta';
}

const changeStatus = (alumn_id,status) => {
  // Buscar en el array de objetos alumno con un id
  alumns.value.forEach(element => {
    if (element.id === alumn_id) {
      element.status = nextStatus(status);
    }
  });

}

</script>
<template>

    <v-row no-gutters class="bg-blues">
      <v-col v-for="alumn in alumns" :key="alumn.title"
            cols="12" sm="6" md="4" lg="3" xl="2" >


          <v-card @click="changeStatus(alumn.id,alumn.status)" class="ma-2 pa-0">


              <v-list>
                <v-list-item :title="alumn.title" :subtitle="textStatus(alumn.status)" >
                  <template v-slot:prepend>
                    <v-avatar :color="statusColor(alumn.status)">
                      <v-icon :icon="statusIcon(alumn.status)" color="white"></v-icon>
                    </v-avatar>
                  </template>

                  <template v-slot:append>
                    <!-- <v-btn color="grey-lighten-1" icon="mdi-information" variant="text"></v-btn> -->
                    <!-- <v-icon icon="mdi-vuetify"></v-icon> -->
                  </template>

                </v-list-item>
              </v-list>


          </v-card>


      </v-col>
    </v-row>

</template>
